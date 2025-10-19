import React, { useRef, useState, useCallback, useEffect } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleOpenCamera = async () => {
    setCameraError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        setIsCameraOpen(true);
      } catch (err) {
        console.error("Error accessing environment camera:", err);
        try {
          // Fallback to default camera if environment camera fails
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(mediaStream);
          setIsCameraOpen(true);
        } catch (fallbackErr) {
          console.error("Error accessing default camera:", fallbackErr);
          setCameraError("Could not access camera. Please check your browser permissions.");
          setIsCameraOpen(true); // Open modal to show the error
        }
      }
    } else {
      setCameraError("Camera not supported on this device or browser.");
      setIsCameraOpen(true);
    }
  };

  const handleCloseCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
    setCameraError(null);
  }, [stream]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onFileSelect(file);
            handleCloseCamera();
          }
        }, 'image/jpeg');
      }
    }
  }, [handleCloseCamera, onFileSelect]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const isClickable = !selectedFile;

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div
        className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col justify-center items-center transition-colors duration-300 ${isClickable ? 'cursor-pointer border-slate-300 hover:border-green-500 hover:bg-green-50' : 'border-slate-300'}`}
        onClick={isClickable ? handleClick : undefined}
        onDragOver={onDragOver}
        onDrop={onDrop}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : -1}
        aria-label={isClickable ? "Upload an image" : "Image preview"}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg"/>
        ) : (
          <div className="text-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>

      {selectedFile ? (
        <div className="flex justify-between items-center mt-4 text-sm">
            <p className="text-slate-600 truncate pr-4">
                Selected: <span className="font-medium">{selectedFile.name}</span>
            </p>
            <button
                onClick={onClear}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                aria-label="Clear selection"
            >
                Clear Selection
            </button>
        </div>
      ) : (
        <>
            <div className="text-center my-4">
                <span className="text-slate-400 text-sm">OR</span>
            </div>
            <div className="text-center">
                <button
                type="button"
                onClick={handleOpenCamera}
                className="inline-flex items-center px-6 py-2 border border-slate-300 text-sm font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use Camera
                </button>
            </div>
        </>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" role="dialog" aria-modal="true">
          <div className="bg-slate-900 p-4 rounded-lg shadow-2xl relative w-full max-w-4xl">
            <canvas ref={canvasRef} className="hidden"></canvas>
            {cameraError ? (
              <div className="text-white text-center p-8 h-64 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-red-400">Camera Error</h3>
                <p className="mt-2 text-slate-300">{cameraError}</p>
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto max-h-[70vh] rounded-md bg-black"></video>
            )}

            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-8">
              {!cameraError && (
                <button 
                  onClick={handleCapture} 
                  className="w-20 h-20 rounded-full bg-white border-4 border-slate-400 hover:border-white transition-all ring-4 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-50" 
                  aria-label="Capture photo"
                ></button>
              )}
            </div>
             <button 
                onClick={handleCloseCamera} 
                className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all focus:outline-none" 
                aria-label="Close camera"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
