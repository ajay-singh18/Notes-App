import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment"
const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
  <div className="group relative border border-gray-200 rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 
                shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out">

  {/* Header */}
  <div className="flex items-start justify-between">
    <div>
      <h6 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
        {title}
      </h6>
      <span className="text-xs text-gray-400">{moment(date).format("MMM DD, YYYY")}</span>
    </div>
    <MdOutlinePushPin
      className={`cursor-pointer text-xl transition-colors duration-200 ${
        isPinned ? "text-blue-500" : "text-gray-300 hover:text-gray-500"
      }`}
      onClick={onPinNote}
    />
  </div>

  {/* Content */}
  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
    {content
      ? content.length > 90
        ? content.slice(0, 90) + "..."
        : content
      : ""}
  </p>

  {/* Footer */}
  <div className="flex items-center justify-between mt-5">
    {/* Tags */}
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
        >
          #{tag}
        </span>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3 text-gray-400">
      <MdCreate
        className="cursor-pointer hover:text-green-500 transition"
        onClick={onEdit}
      />
      <MdDelete
        className="cursor-pointer hover:text-red-500 transition"
        onClick={onDelete}
      />
    </div>
  </div>
</div>

  );
};

export default Notecard;
