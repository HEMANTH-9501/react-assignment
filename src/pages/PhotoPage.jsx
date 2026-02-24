import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

// Shows captured photo and allows download or retake
const PhotoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state?.imageData) {
      // No image passed, redirect to list
      navigate('/list', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.imageData) {
    return null;
  }

  const { imageData, employeeName } = state;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${employeeName || 'employee'}-photo.png`;
    link.click();
  };

  const handleRetake = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Photo Capture Result
          </h1>
          {employeeName && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Employee: {employeeName}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm border border-slate-100 dark:border-slate-700/70 p-4 flex flex-col items-center gap-4">
        <img
          src={imageData}
          alt="Captured employee"
          className="rounded-xl max-h-80 object-contain shadow-md"
        />
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={handleRetake}>
            Retake
          </Button>
          <Button size="sm" onClick={handleDownload}>
            Download Image
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/details/' + (state.employeeId || ''))}
          >
            Back to Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;

