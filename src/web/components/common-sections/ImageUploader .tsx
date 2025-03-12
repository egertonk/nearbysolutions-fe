import React, { useState } from "react";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <>
          <p className="mt-2 text-sm">Share this local URL:</p>
          <code className="block bg-gray-100 p-2 break-all">{imageUrl}</code>
          <img src={imageUrl} alt="Preview" className="mt-4 w-96 rounded" />
        </>
      )}
    </div>
  );
};

export default ImageUploader;
