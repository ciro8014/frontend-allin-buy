// components/auth/VendorGuard.js - Wrapper específico para vendedores
export const VendorGuard = ({ children }) => {
  return (
    <AuthGuard requireAuth={true} requireVendor={true}>
      {children}
    </AuthGuard>
  );
};