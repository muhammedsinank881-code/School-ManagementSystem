import React from "react";

const ImageUpload = ({ formData, handleImageChange, Doc }) => {
    return (
        <div className="flex flex-col items-center justify-center mx-10 p-10 border-2 border-dashed border-gray-400 mt-4 rounded-xl gap-3">
            {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
            ) : (
                <button onClick={() => document.getElementById("imageUpload").click()}>
                    <img src={Doc} alt="upload" />
                </button>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
            />

            <p>drop files to upload</p>

            <label
                htmlFor="imageUpload"
                className="cursor-pointer border p-1 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
                Select File
            </label>
        </div>
    );
};

export default ImageUpload;