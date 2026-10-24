import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StoreHero } from './components/store/StoreHero';
import { StoreCatalog } from './components/store/StoreCatalog';
import { CompanyProfileSection } from './components/store/CompanyProfileSection';
import { ProductModal } from './components/store/ProductModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { RegistrationOfferModal } from './components/store/RegistrationOfferModal';
import { LoginModal } from './components/auth/LoginModal';
import { CustomerChatWidget } from './components/chat/CustomerChatWidget';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VideoBackground } from './components/common/VideoBackground';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { BrandIdentityModal } from './components/store/BrandIdentityModal';
import { PromotionsSection } from './components/store/PromotionsSection';
import { TechnicianShowcaseSection } from './components/store/TechnicianShowcaseSection';
import { CatalogVideoShowcase } from './components/store/CatalogVideoShowcase';
import { SocialHashtagsBar } from './components/common/SocialHashtagsBar';
import { ToolsGuideSection } from './components/tools/ToolsGuideSection';
import { ToolDetailModal } from './components/tools/ToolDetailModal';
import { InteractiveTutorialModal } from './components/tools/InteractiveTutorialModal';
import { PaymentMethodsSection } from './components/store/PaymentMethodsSection';
import { OrderTrackingSection } from './components/store/OrderTrackingSection';
import { TOOLS_GUIDE_DATA, ToolGuideItem } from './data/toolsGuideData';
import { Product, PaymentMethod } from './types';

const MainLayout: React.FC = () => {
  const { 
    activeMode, 
    setActiveMode, 
    setAdminTab,
    products, 
    cart, 
    addToCart,
    activeGuideToolId,
    activeTutorialToolId,
    openToolGuide,
    closeToolGuide,
    openToolTutorial,
    closeToolTutorial
  } = useApp();
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [checkoutInitialMethod, setCheckoutInitialMethod] = useState<PaymentMethod>('yape');

  // Active tool being inspected in Detail or Tutorial modal
  const currentGuideTool = TOOLS_GUIDE_DATA.find(t => t.id === activeGuideToolId) || null;
  const currentTutorialTool = TOOLS_GUIDE_DATA.find(t => t.id === activeTutorialToolId) || null;

  // Execute live action in the application based on tool
  const handleExecuteLiveAction = (tool: ToolGuideItem) => {
    switch (tool.liveActionType) {
      case 'scroll_vehicle': {
        setActiveMode('store');
        setTimeout(() => {
          const el = document.getElementById('catalogo-repuestos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        break;
      }
      case 'scroll_catalog': {
        setActiveMode('store');
        setTimeout(() => {
          const el = document.getElementById('catalogo-repuestos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        break;
      }
      case 'open_product': {
        setActiveMode('store');
        if (products.length > 0) {
          setSelectedProduct(products[0]);
        }
        break;
      }
      case 'open_cart': {
        setIsCartOpen(true);
        break;
      }
      case 'open_checkout': {
        if (cart.length === 0 && products.length > 0) {
          addToCart(products[0], 1);
        }
        setIsCheckoutOpen(true);
        break;
      }
      case 'open_chat': {
        setIsChatOpen(true);
        break;
      }
      case 'open_admin_inventory': {
        setActiveMode('admin');
        setAdminTab('inventory');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }
      case 'open_admin_alerts': {
        setActiveMode('admin');
        setAdminTab('alerts');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }
      case 'open_admin_analytics': {
        setActiveMode('admin');
        setAdminTab('analytics');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }
      case 'open_admin_orders': {
        setActiveMode('admin');
        setAdminTab('orders');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }
      case 'scroll_tracking': {
        setActiveMode('store');
        setTimeout(() => {
          const el = document.getElementById('rastreo-pedidos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Automotive Video */}
      <VideoBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="relative z-10 flex-1">
        {activeMode === 'store' ? (
          <>
            <StoreHero 
              onOpenRegister={() => setIsRegisterOpen(true)} 
              onOpenBrandModal={() => setIsBrandModalOpen(true)}
            />
            <PromotionsSection onOpenDetails={(prod) => setSelectedProduct(prod)} />
            <TechnicianShowcaseSection onOpenDetails={(prod) => setSelectedProduct(prod)} />
            <CatalogVideoShowcase onOpenDetails={(prod) => setSelectedProduct(prod)} />
            <StoreCatalog onOpenDetails={(prod) => setSelectedProduct(prod)} />
            
            {/* Real-Time Order Tracking & Stage Status Checker */}
            <OrderTrackingSection
              onOpenChatWithOrder={(orderNum) => {
                setIsChatOpen(true);
              }}
            />

            {/* Secure Payment Methods in Peru (Yape, Plin, Cards, Transfers) */}
            <PaymentMethodsSection
              onSelectPaymentMethod={(method) => {
                setCheckoutInitialMethod(method);
                if (cart.length === 0 && products.length > 0) {
                  addToCart(products[0], 1);
                }
                setIsCheckoutOpen(true);
              }}
              onOpenCheckout={() => {
                if (cart.length === 0 && products.length > 0) {
                  addToCart(products[0], 1);
                }
                setIsCheckoutOpen(true);
              }}
            />

            {/* Comprehensive Tools & Step-by-Step Practical Guide Section */}
            <ToolsGuideSection
              onOpenDetailModal={(tool) => openToolGuide(tool.id)}
              onStartTutorial={(tool) => openToolTutorial(tool.id)}
              onExecuteLiveAction={handleExecuteLiveAction}
            />

            <CompanyProfileSection 
              onOpenChat={() => setIsChatOpen(true)} 
              onOpenBrandModal={() => setIsBrandModalOpen(true)}
            />
            <SocialHashtagsBar />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Global Footer with business hours, tools guides and store info */}
      <div className="relative z-10">
        <Footer onOpenBrandModal={() => setIsBrandModalOpen(true)} />
      </div>

      {/* Modals & Slide-overs */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialPaymentMethod={checkoutInitialMethod}
      />

      {/* 10% Discount Registration Offer Modal */}
      <RegistrationOfferModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Login Modal specifically for fernandezursula31@gmail.com */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Customer Chat Widget */}
      <CustomerChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Brand Identity & Color Palette Modal */}
      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      {/* Detailed Tool Explanation Modal */}
      <ToolDetailModal
        tool={currentGuideTool}
        onClose={closeToolGuide}
        onStartTutorial={(tool) => {
          closeToolGuide();
          openToolTutorial(tool.id);
        }}
        onExecuteLiveAction={handleExecuteLiveAction}
      />

      {/* Interactive Step-by-Step Walkthrough Modal */}
      <InteractiveTutorialModal
        tool={currentTutorialTool}
        onClose={closeToolTutorial}
        onExecuteLiveAction={handleExecuteLiveAction}
      />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
