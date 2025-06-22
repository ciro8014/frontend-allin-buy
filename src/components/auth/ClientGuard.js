// components/auth/ClientGuard.js - Wrapper para clientes autenticados
export const ClientGuard = ({ children }) => {
  return (
    <AuthGuard requireAuth={true} requireVendor={false}>
      {children}
    </AuthGuard>
  );
};