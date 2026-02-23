const AddEventModal = ({
  isOpen,
  onClose,
  onAddEvent,
  formData,
  setFormData,
  setIsOpen,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) return;
    onAddEvent();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Event</h2>

        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option>Academic</option>
            <option>Meeting</option>
            <option>Sports</option>
            <option>Cultural</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
            >
              Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;