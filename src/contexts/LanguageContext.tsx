import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.markets': 'Markets',
    'nav.products': 'Products',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Driving Global Trade Forward',
    'hero.subtitle': 'Leading international automotive export and industrial materials distribution across North America and Africa',
    'hero.cta': 'Learn More',
    
    // About Section
    'about.title': 'About Mobile Union',
    'about.subtitle': 'Two Companies, One Vision',
    'about.us.title': 'Mobile Union Inc. (USA)',
    'about.us.description': 'Based in San Diego, California, we specialize in exporting high-quality pre-owned vehicles from the United States to African markets, providing reliable transportation solutions.',
    'about.canada.title': 'Mobile Union Canada Inc.',
    'about.canada.description': 'Located in Vancouver, British Columbia, our Canadian subsidiary focuses on automotive parts distribution and CBN super-hard materials for industrial applications.',
    
    // Services Section
    'services.title': 'Our Services',
    'services.us.title': 'U.S. Operations',
    'services.us.item1': 'Vehicle Sourcing & Inspection',
    'services.us.item2': 'Export Documentation',
    'services.us.item3': 'Shipping Coordination',
    'services.us.item4': 'Customs Support',
    'services.canada.title': 'Canadian Operations',
    'services.canada.item1': 'Automotive Parts Distribution',
    'services.canada.item2': 'CBN Materials Supply',
    'services.canada.item3': 'Industrial Tool Solutions',
    'services.canada.item4': 'Manufacturing Support',
    
    // Markets Section
    'markets.title': 'Global Markets',
    'markets.africa.title': 'African Markets',
    'markets.africa.description': 'We serve major African markets including Nigeria, Ghana, Kenya, and other developing economies.',
    'markets.canada.title': 'Canadian Market',
    'markets.canada.description': 'Comprehensive coverage across Canada for automotive parts and industrial materials.',
    
    // Products Section
    'products.title': 'Products & Gallery',
    'products.vehicles.title': 'Exported Vehicles',
    'products.materials.title': 'CBN Materials',
    'products.parts.title': 'Auto Parts',
    
    // News Section
    'news.title': 'Latest News',
    'news.item1.title': 'Expanding African Market Presence',
    'news.item1.date': 'October 2024',
    'news.item1.description': 'Mobile Union Inc. announces new partnerships in West African markets.',
    'news.item2.title': 'CBN Materials Innovation',
    'news.item2.date': 'September 2024',
    'news.item2.description': 'Mobile Union Canada introduces advanced CBN cutting solutions.',
    'news.item3.title': 'Sustainability Initiative',
    'news.item3.date': 'August 2024',
    'news.item3.description': 'Both companies commit to sustainable business practices.',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.us.title': 'United States Office',
    'contact.us.address': 'San Diego, California, USA',
    'contact.canada.title': 'Canada Office',
    'contact.canada.address': 'Vancouver, British Columbia, Canada',
    'contact.form.title': 'Get in Touch',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.description': 'Mobile Union - Connecting global markets through reliable automotive export and industrial materials distribution.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Info',
    'footer.rights': '© 2024 Mobile Union Inc. All rights reserved.',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.services': '服务',
    'nav.markets': '市场',
    'nav.products': '产品',
    'nav.news': '新闻',
    'nav.contact': '联系我们',
    
    // Hero Section
    'hero.title': '推动全球贸易发展',
    'hero.subtitle': '在北美和非洲地区领先的国际汽车出口和工业材料分销企业',
    'hero.cta': '了解更多',
    
    // About Section
    'about.title': '关于美联移动',
    'about.subtitle': '两家公司，一个愿景',
    'about.us.title': '美联移动公司（美国）',
    'about.us.description': '总部位于加利福尼亚州圣地亚哥，专门从事将美国优质二手车出口到非洲市场，提供可靠的交通解决方案。',
    'about.canada.title': '美联移动加拿大公司',
    'about.canada.description': '位于不列颠哥伦比亚省温哥华，我们的加拿大子公司专注于汽车零部件分销和工业应用的CBN超硬材料。',
    
    // Services Section
    'services.title': '我们的服务',
    'services.us.title': '美国业务',
    'services.us.item1': '车辆采购与检验',
    'services.us.item2': '出口文件处理',
    'services.us.item3': '运输协调',
    'services.us.item4': '海关支持',
    'services.canada.title': '加拿大业务',
    'services.canada.item1': '汽车零部件分销',
    'services.canada.item2': 'CBN材料供应',
    'services.canada.item3': '工业工具解决方案',
    'services.canada.item4': '制造业支持',
    
    // Markets Section
    'markets.title': '全球市场',
    'markets.africa.title': '非洲市场',
    'markets.africa.description': '我们服务于主要的非洲市场，包括尼日利亚、加纳、肯尼亚和其他发展中经济体。',
    'markets.canada.title': '加拿大市场',
    'markets.canada.description': '在加拿大全境为汽车零部件和工业材料提供全面覆盖。',
    
    // Products Section
    'products.title': '产品展示',
    'products.vehicles.title': '出口车辆',
    'products.materials.title': 'CBN材料',
    'products.parts.title': '汽车零部件',
    
    // News Section
    'news.title': '最新动态',
    'news.item1.title': '扩大非洲市场影响力',
    'news.item1.date': '2024年10月',
    'news.item1.description': '美联移动公司宣布在西非市场建立新的合作伙伴关系。',
    'news.item2.title': 'CBN材料创新',
    'news.item2.date': '2024年9月',
    'news.item2.description': '美联移动加拿大公司推出先进的CBN切削解决方案。',
    'news.item3.title': '可持续发展倡议',
    'news.item3.date': '2024年8月',
    'news.item3.description': '两家公司承诺采用可持续的商业实践。',
    
    // Contact Section
    'contact.title': '联系我们',
    'contact.us.title': '美国办事处',
    'contact.us.address': '美国加利福尼亚州圣地亚哥',
    'contact.canada.title': '加拿大办事处',
    'contact.canada.address': '加拿大不列颠哥伦比亚省温哥华',
    'contact.form.title': '联系我们',
    'contact.form.name': '姓名',
    'contact.form.email': '邮箱地址',
    'contact.form.company': '公司',
    'contact.form.message': '留言',
    'contact.form.submit': '发送消息',
    
    // Footer
    'footer.description': '美联移动 - 通过可靠的汽车出口和工业材料分销连接全球市场。',
    'footer.links': '快速链接',
    'footer.contact': '联系信息',
    'footer.rights': '© 2024 美联移动公司。保留所有权利。',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};