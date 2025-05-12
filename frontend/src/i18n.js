import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Common
      "app.name": "Event Booking System",
      "app.description": "Book and manage events easily",

      // Navigation
      "nav.home": "Home",
      "nav.events": "Events",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.profile": "Profile",
      "nav.admin": "Admin",
      "nav.logout": "Logout",

      // Auth
      "auth.login": "Login",
      "auth.register": "Register",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.forgotPassword": "Forgot Password?",
      "auth.resetPassword": "Reset Password",

      // Events
      "events.title": "Events",
      "events.create": "Create Event",
      "events.edit": "Edit Event",
      "events.delete": "Delete Event",
      "events.details": "Event Details",
      "events.book": "Book Now",
      "events.capacity": "Capacity",
      "events.date": "Date",
      "events.time": "Time",
      "events.location": "Location",
      "events.price": "Price",

      // Bookings
      "bookings.title": "My Bookings",
      "bookings.status": "Status",
      "bookings.date": "Booking Date",
      "bookings.cancel": "Cancel Booking",

      // Admin
      "admin.dashboard": "Dashboard",
      "admin.events": "Events",
      "admin.bookings": "Bookings",
      "admin.users": "Users",
      "admin.settings": "Settings",

      // Messages
      "message.success": "Success",
      "message.error": "Error",
      "message.loading": "Loading...",
      "message.noData": "No data available",
    },
  },
  ar: {
    translation: {
      // Common
      "app.name": "نظام حجز الفعاليات",
      "app.description": "احجز وأدر الفعاليات بسهولة",

      // Navigation
      "nav.home": "الرئيسية",
      "nav.events": "الفعاليات",
      "nav.login": "تسجيل الدخول",
      "nav.register": "إنشاء حساب",
      "nav.profile": "الملف الشخصي",
      "nav.admin": "الإدارة",
      "nav.logout": "تسجيل الخروج",

      // Auth
      "auth.login": "تسجيل الدخول",
      "auth.register": "إنشاء حساب",
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.confirmPassword": "تأكيد كلمة المرور",
      "auth.forgotPassword": "نسيت كلمة المرور؟",
      "auth.resetPassword": "إعادة تعيين كلمة المرور",

      // Events
      "events.title": "الفعاليات",
      "events.create": "إنشاء فعالية",
      "events.edit": "تعديل الفعالية",
      "events.delete": "حذف الفعالية",
      "events.details": "تفاصيل الفعالية",
      "events.book": "احجز الآن",
      "events.capacity": "السعة",
      "events.date": "التاريخ",
      "events.time": "الوقت",
      "events.location": "الموقع",
      "events.price": "السعر",

      // Bookings
      "bookings.title": "حجوزاتي",
      "bookings.status": "الحالة",
      "bookings.date": "تاريخ الحجز",
      "bookings.cancel": "إلغاء الحجز",

      // Admin
      "admin.dashboard": "لوحة التحكم",
      "admin.events": "الفعاليات",
      "admin.bookings": "الحجوزات",
      "admin.users": "المستخدمين",
      "admin.settings": "الإعدادات",

      // Messages
      "message.success": "تم بنجاح",
      "message.error": "خطأ",
      "message.loading": "جاري التحميل...",
      "message.noData": "لا توجد بيانات",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
