import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { CartDrawer } from "@/components/CartDrawer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { FloatingActions } from "@/components/FloatingActions";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "@/pages/Home";
import MenuPage from "@/pages/Menu";
import DealsPage from "@/pages/Deals";
import NaanStopPage from "@/pages/NaanStop";
import BranchesPage from "@/pages/Branches";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import CheckoutPage from "@/pages/Checkout";
import OrderConfirmationPage from "@/pages/OrderConfirmation";
import TrackOrderPage from "@/pages/TrackOrder";
import AdminPage from "@/pages/Admin";
import FaqsPage from "@/pages/Faqs";
import DeliveryInformationPage from "@/pages/DeliveryInformation";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy";
import TermsPage from "@/pages/Terms";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <LoadingScreen />
      <Header />
      <main className="min-h-[50vh] pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/naan-stop" element={<NaanStopPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/delivery-information" element={<DeliveryInformationPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <FloatingActions />
      <Toaster position="top-center" />
    </StoreProvider>
  );
}
