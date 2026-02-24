import React, { useEffect, useRef, useState } from 'react';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';

// Handles live camera preview and photo capture
const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setError('');
    setIsStarting(true);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera API not supported in this browser.');
        return;
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access camera. Please allow permission.');
    } finally {
      setIsStarting(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) {
      setError('Camera not ready yet. Please wait a moment.');
      return;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    onCapture(imageData);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Capture a live photo to attach to this employee profile.
        </p>
        <button
          className="text-xs text-primary underline"
          onClick={() => setShowHelp(true)}
        >
          Camera help
        </button>
      </div>

      <div className="grid md:grid-cols-[2fr,1fr] gap-4">
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-3 flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/40">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-64 rounded-xl bg-black/40 object-contain mb-3"
          />
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={startCamera}
              loading={isStarting}
            >
              {stream ? 'Restart Camera' : 'Start Camera'}
            </Button>
            <Button
              size="sm"
              onClick={capturePhoto}
              disabled={!stream}
            >
              Capture Photo
            </Button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
          )}
        </div>

        <div className="hidden md:flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-600 dark:text-slate-100">
            Tips for best results
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a well-lit environment.</li>
            <li>Center your face in the camera frame.</li>
            <li>Ensure your browser has camera permission.</li>
          </ul>
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      <Modal
        open={showHelp}
        title="Camera permissions help"
        onClose={() => setShowHelp(false)}
      >
        <p className="text-sm mb-2">
          If the camera does not start, please:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Allow camera access in your browser prompt.</li>
          <li>Check browser settings → Privacy → Camera.</li>
          <li>Try using the latest version of Chrome or Edge.</li>
        </ul>
      </Modal>
    </div>
  );
};

export default CameraCapture;

