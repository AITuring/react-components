import './index.css';
export default function Header() {
  return (
    <div className="header">
      <div className="flex items-center h-[28px] leading-7">
        <div className="header-icon">&lt;</div>
        <div className="text-base">2024年3月</div>
        <div className="header-icon">&gt;</div>
        <button className="bg-gray-200 cursor-pointer rounded-sm border-none px-4 leading-7 hover:bg-gray-600 hover:text-gray-50">
          今天
        </button>
      </div>
    </div>
  );
}
