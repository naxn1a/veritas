import Link from "next/link";

export default function AvatarGroup() {
  return (
    <div>
      <div className="avatar-group -space-x-6 rtl:space-x-reverse">
        <div className="avatar">
          <div className="w-12">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-12">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-12">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <Link href="#" className="">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12">
              <span>+99</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}