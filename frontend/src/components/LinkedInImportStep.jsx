import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileArchive, 
  CheckCircle2, 
  HelpCircle, 
  X, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export default function LinkedInImportStep({ onFinish, onBack, onSkip }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processArchive = (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    // Simulate real extraction of LinkedIn archive CSVs
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        fileName: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        filesFound: [
          { name: 'Profile.csv', details: 'Full name, Headline, Summary, Contact info', count: '1 record' },
          { name: 'Positions.csv', details: 'Work history, Companies, Bullet points', count: '3 roles' },
          { name: 'Education.csv', details: 'University, Degree, Graduation dates', count: '1 degree' },
          { name: 'Skills.csv', details: 'Technical skills & endorsements', count: '28 skills' },
          { name: 'Certifications.csv', details: 'Licenses & professional certifications', count: '2 records' }
        ]
      });
    }, 1200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processArchive(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processArchive(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setExtractedData(null);
  };

  const handleDemoUpload = () => {
    processArchive({
      name: 'Basic_LinkedInDataExport_11-18-2026.zip',
      size: 1420000
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Step 5 of 5
              </span>
              <span className="text-xs text-zinc-400">&bull; LinkedIn Archive Ingestion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Import Your LinkedIn Data
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Upload your official LinkedIn data archive to automatically enrich your experiences and endorsements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={() => onFinish({ imported: !!extractedData })}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <span>{extractedData ? 'Finish & Launch Setup' : 'Skip & Finish Setup'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        {!extractedData ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center transition-all ${
              isDragging
                ? 'border-white bg-zinc-900/80 scale-[1.01]'
                : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/30'
            }`}
          >
            <input
              type="file"
              id="zip-upload"
              accept=".zip"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-5 text-white shadow-md">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Upload your archive ... drop your zip here
            </h3>
            
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Drag and drop your LinkedIn exported <span className="text-white font-mono">.zip</span> archive here, or browse files from your computer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <label
                htmlFor="zip-upload"
                className="cursor-pointer px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-95"
              >
                Browse Files (.zip)
              </label>

              <button
                type="button"
                onClick={handleDemoUpload}
                className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                Try Sample Archive
              </button>
            </div>

            {isProcessing && (
              <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-center gap-3 text-xs font-mono text-zinc-300">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Extracting Profile.csv, Positions.csv, Skills.csv...</span>
              </div>
            )}
          </div>
        ) : (
          /* Extracted Preview State */
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileArchive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {extractedData.fileName}
                    <span className="text-xs font-mono font-normal text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      ✓ Archive Validated
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">Archive Size: {extractedData.size}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Remove archive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-zinc-400 block mb-2">
                Parsed Data Entities Ready for Semantic Matching:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedData.filesFound.map((file, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-zinc-400" />
                      <div>
                        <p className="text-xs font-mono font-bold text-white">{file.name}</p>
                        <p className="text-[11px] text-zinc-400">{file.details}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-300 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                      {file.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All archive entries successfully mapped to your master candidate profile.</span>
            </div>
          </div>
        )}

        {/* How to Get Archive Guide */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-white uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-zinc-400" />
            How to Download Your LinkedIn Data Archive
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-400 leading-relaxed">
            <li>Open <strong className="text-zinc-200">LinkedIn</strong> and click your profile picture &gt; <strong className="text-zinc-200">Settings &amp; Privacy</strong>.</li>
            <li>In the left sidebar, click <strong className="text-zinc-200">Data privacy</strong>.</li>
            <li>Select <strong className="text-zinc-200">"Get a copy of your data"</strong>.</li>
            <li>Choose <strong className="text-zinc-200">"Download larger data archive"</strong> or select Profile, Positions, Education, and Skills.</li>
            <li>LinkedIn will send a download link to your email within minutes. Once downloaded, drop the <strong className="text-zinc-200">.zip</strong> file above.</li>
          </ol>
        </div>

        {/* Bottom CTA Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-800 mt-8">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
          >
            Skip for now &amp; proceed without archive
          </button>

          <button
            onClick={() => onFinish({ imported: !!extractedData })}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl active:scale-95"
          >
            <span>Finish Setup &amp; Launch Radar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
