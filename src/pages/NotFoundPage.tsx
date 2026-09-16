import React from 'react';
import { clientConfig } from '../client.config';
import { Link, useDocumentMeta } from '../lib/router';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useDocumentMeta(
    `Page not found | ${clientConfig.clinic.name}`,
    'The page you were looking for is not available. Browse all treatments at our Jumeirah clinic in Dubai.',
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F5F1] px-6 pb-20 pt-36">
      <div className="max-w-lg text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#806334]">
          404
        </span>
        <h1 className="mt-4 text-3xl leading-tight tracking-[-0.02em] text-[#0A0A0A] sm:text-4xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-500">
          The link may be out of date. Every treatment we offer is listed on the procedures
          page, or you can message the clinic and we will point you to the right place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/procedures"
            className="inline-flex min-h-11 items-center gap-2.5 bg-[#C9A876] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:bg-[#B89660]"
          >
            All procedures
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2.5 border border-[#0A0A0A] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:border-[#C9A876] hover:text-[#806334]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
