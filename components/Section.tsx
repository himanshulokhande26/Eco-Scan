import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id }) => {
  return (
    <section id={id} className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-8">{title}</h3>
        <div className="prose max-w-2xl mx-auto text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;