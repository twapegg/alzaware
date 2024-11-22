import HeaderPage from "@/components/sub/headerpage";
import AccountSettings from "@/components/sub/account-settings"; // Change to PascalCase

export default function Page() {
  return (
    <div>
      <HeaderPage title="Account Settings" />
      <div className="container p-8">
        <AccountSettings /> {/* Use PascalCase here */}
      </div>
    </div>
  );
}
