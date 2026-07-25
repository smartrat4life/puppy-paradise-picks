import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Download, Facebook, Mail, Phone, Clock, PawPrint, ArrowRight } from 'lucide-react';
import jsPDF from 'jspdf';

const LOGO_URL = '/images/logo/puppy-logo.png';

const loadImageAsDataURL = (url: string): Promise<string | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });

const prettyLabel = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (v: any): string => {
  if (v === null || v === undefined || v === '') return 'Not provided';
  if (Array.isArray(v)) return v.length ? v.join(', ') : 'Not provided';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return String(v);
};

const ApplicationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as {
    application?: Record<string, any>;
    puppy?: { name?: string; breed?: string } | null;
  };

  useEffect(() => {
    if (!state.application) {
      navigate('/adoption-application', { replace: true });
    }
  }, [state.application, navigate]);

  const submittedAt = useMemo(() => new Date().toLocaleString(), []);

  const generatePDF = async () => {
    const app = state.application || {};
    const puppy = state.puppy;

    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    let y = margin;

    // Logo
    const logo = await loadImageAsDataURL(LOGO_URL);
    if (logo) {
      try {
        doc.addImage(logo, 'PNG', margin, y, 64, 64);
      } catch {}
    }

    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 53, 15); // amber-900
    doc.setFontSize(22);
    doc.text('Pick a Puppy', margin + 80, y + 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(13, 148, 136); // teal-600
    doc.text('Adoption Application Confirmation', margin + 80, y + 46);

    y += 90;
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 20;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(`Submitted: ${submittedAt}`, margin, y);
    y += 20;

    if (puppy?.name) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(120, 53, 15);
      doc.text(`Puppy of Interest: ${puppy.name}${puppy.breed ? ` (${puppy.breed})` : ''}`, margin, y);
      y += 22;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(120, 53, 15);
    doc.text('Application Details', margin, y);
    y += 18;

    const skipKeys = new Set(['user_id', 'puppy_id', 'status']);
    const entries = Object.entries(app).filter(([k]) => !skipKeys.has(k));

    doc.setFontSize(11);
    entries.forEach(([key, value]) => {
      const label = prettyLabel(key);
      const val = formatValue(value);
      const labelText = `${label}:`;
      const wrapped = doc.splitTextToSize(val, pageWidth - margin * 2 - 10);
      const blockHeight = 16 + wrapped.length * 14 + 6;

      if (y + blockHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(13, 148, 136);
      doc.text(labelText, margin, y);
      y += 14;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      doc.text(wrapped, margin + 10, y);
      y += wrapped.length * 14 + 8;
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text(
        'Pick a Puppy  •  pickapuppyplus@gmail.com  •  Please send this PDF to our Facebook page.',
        pageWidth / 2,
        pageHeight - 20,
        { align: 'center' }
      );
    }

    const safeName = (app.applicant_name || 'applicant').toString().replace(/[^a-z0-9]+/gi, '_');
    doc.save(`PickAPuppy_Application_${safeName}.pdf`);
  };

  if (!state.application) return null;

  const app = state.application;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-2 border-green-200 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-amber-500 p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Application Submitted!
                </h1>
                <p className="text-white/90 text-lg">
                  Thank you, {app.applicant_name}. We've received your adoption application.
                </p>
              </div>

              <CardContent className="p-8 space-y-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
                  <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-teal-600" />
                    What Happens Next?
                  </h2>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Our team will carefully review your application within 24–48 hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>You'll hear from us at <strong>{app.applicant_email}</strong> with next steps.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span></span>
                    </li>
                  </ul>
                </div>

                <div className="text-center space-y-4">
                  <Button
                    onClick={generatePDF}
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Application PDF
                  </Button>

                  <p className="text-amber-800 max-w-xl mx-auto">
                    Please download this PDF and send it to our{' '}
                    <a
                      href="https://www.facebook.com/profile.php?id=100088549120878"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Facebook className="w-4 h-4" />
                      Pick a Puppy Facebook page
                    </a>{' '}
                    so we can confirm your application faster.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <h3 className="font-bold text-amber-900 mb-2">Helpful Reminders</h3>
                  <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                    <li>Keep a copy of your PDF for your records.</li>
                    <li>Add <strong>pickapuppyplus@gmail.com</strong> to your contacts so our reply doesn't land in spam.</li>
                    <li>Have questions? Message us on Facebook or Instagram anytime.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button asChild variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-50">
                    <Link to="/">Back to Home</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                    <Link to="/favorites">
                      View My Favorites <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ApplicationSuccess;
