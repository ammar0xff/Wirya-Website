export interface ServiceAttribute {
  id: string
  nameAr: string
  nameEn: string
  valueAr: string
  valueEn: string
}

export interface ServiceOption {
  id: string
  nameAr: string
  nameEn: string
  priceModifier: number
}

export interface Service {
  id: string
  category: string
  nameAr: string
  nameEn: string
  descriptionAr: string
  descriptionEn: string
  price: number
  currency: string
  stock: number
  inStock: boolean
  image: string
  previewImages: string[]
  attributes: ServiceAttribute[]
  options: ServiceOption[]
  whatsappLink: string
  detailedDescAr: string
  detailedDescEn: string
  detailedContentPath?: string
  longDescriptionAr?: string
  longDescriptionEn?: string
}

export interface ServiceCategory {
  id: string
  nameAr: string
  nameEn: string
}

export const serviceCategories: ServiceCategory[] = []

export const services: Service[] = [
  {
    "id": "install-android-system",
    "nameAr": "تثبيت نظام اندرويد",
    "nameEn": "Install Android System",
    "descriptionAr": "ثبت أندرويد كامل جنب الويندوز وشغّل كل ألعابك وتطبيقاتك بسرعة خرافية ومن غير ما تمسح أي حاجة! 🚀💙",
    "descriptionEn": "Install a full Android system alongside Windows and run all your apps and games at lightning speed — no data loss, all for just 150 EGP! 🚀💙",
    "category": "cat-1762126199121",
    "price": 150,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/q.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24117674131264924/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### 🚀 ثبّت نظام أندرويد كامل على جهازك جنب الويندوز!\n\nدلوقتي تقدر **تثبّت أندرويد كامل** على الكمبيوتر **بنفس شكل وستايل الويندوز**،\nلكن بأداء أعلى بكتير من أي محاكي جربته قبل كده! ⚡\n\n#### 💡 **المميزات:**\n\n✅ **سرعة خرافية:** ودّع التهنيج والتقطيع للأبد.\n\n✅ **واجهة سهلة وبسيطة:** شكل أنيق وسهل الاستخدام.\n\n✅ **يشغّل أي لعبة أو تطبيق:** كأنك على الموبايل بالظبط 🎮\n\n✅ **نظامين في نفس الوقت:** الأندرويد بيتثبت **جنب الويندوز**، وتقدر تختار بينهم عند فتح الجهاز — **من غير ما تمسح أي حاجة!** 🖥️\n\n📞 **كلمنا دلوقتي!**\n\nالفني هييجي يثبتلك النظام في **أقل من ساعة** — وكل ده بـ **150 جنيه بس!** 💙\n",
    "longDescriptionEn": "### 🚀 Install Full Android on Your PC — Alongside Windows!\n\nNow you can **install a complete Android system** on your computer with the **same look and feel as Windows**, but with **much higher performance** than any emulator you’ve ever used!\n\n#### 💡 **Why You’ll Love It:**\n\n✅ **Super fast & smooth:** Say goodbye to lag and stuttering forever.\n✅ **Easy-to-use interface:** Simple, clean, and feels familiar.\n✅ **Play & use anything:** Run any Android app or game just like on your phone 🎮\n✅ **Dual system setup:** Android installs **alongside Windows**, so you can switch between them anytime — **no data loss, no file deletion!** 🖥️\n\n📞 **Contact us now!**\nOur technician will install everything in **less than an hour** — all for just **150 EGP**! 💙\n"
  },
  {
    "id": "Installing-Windows",
    "nameAr": "تثبيت ويندوز",
    "nameEn": "Installing Windows",
    "descriptionAr": "ثبّت أي ويندوز تحبه بـ100 جنيه بس! كل البرامج جاهزة، التعريفات متعرفّة، حتى لو جهازك قديم أو مساحته قليلة — وريا هتظبطه من الآخر! ⚙️🚀",
    "descriptionEn": "Install any Windows version for just 100 EGP! Pre-installed apps, full driver setup, even runs perfectly on old or low-space PCs — Werya’s got you covered! 🚀💻",
    "category": "cat-1762126199121",
    "price": 100,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/windows.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24364144226585208/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### مش مجرد تسطيب… دي تجربة ترجع جهازك للحياة 🚀\n\nتسطيب ويندوز جديد ممكن يكون شيء عادي،\nلكن لما تعملها **مع وريا** — الموضوع بيبقى مختلف تمامًا!\nإحنا مش بس بنثبت ويندوز، إحنا بنجهّز جهازك يكون **جاهز للشغل والأداء العالي** من أول لحظة تشغيل.\n\n---\n\n### 💡 ليه تختار وريا؟\n\n* 💸 **أي إصدار ويندوز تحبه** بـ **100 جنيه بس!**\n* ⚙️ كل برامج الشغل الأساسية **متثبتة وجاهزة** بعد التثبيت.\n* 🔌 **كل التعريفات والإكسسوارات متظبطة** — يعني مفيش صداع ولا تعب.\n* 🚀 نقدر نثبت **Windows 11** على أي جهاز قديم بأداء سريع ومستقر.\n* 📦 **مساحة جهازك صغيرة؟** مفيش مشكلة! بنقدر نثبت الويندوز في **أقل من 10 جيجا**.\n\n---\n\n### ⚡ سرعة - كفاءة - جاهزية\n\nفريقنا الفني بيظبط كل حاجة من أول تسطيب النظام لحد تشغيل البرامج،\nعلشان جهازك يشتغل بسرعة وثبات من غير أي مشاكل.\n\n---\n\n### 💬 جاهز تبدأ؟\n\nاتواصل معانا دلوقتي وخلي **وريا** ترجع لجهازك سرعته وكفاءته —\nوكل ده في أقل من ساعة وبـ **100 جنيه بس!** 💙\n",
    "longDescriptionEn": "### Not Just a Reinstallation — It’s a Full Upgrade Experience 🚀\n\nReinstalling Windows might sound ordinary, but doing it **with Wirya** turns it into something extraordinary.\nWe don’t just install Windows — we prepare your device for **peak performance** and a **ready-to-work setup** from the very first boot.\n\n---\n\n### 💡 Why Choose Werya?\n\n* 💸 **Any Windows version** you want — for only **100 EGP**.\n* ⚙️ All essential **work programs pre-installed** and ready to use.\n* 🔌 **All drivers configured** — no missing devices, no setup headaches.\n* 🚀 **Windows 11 on any PC**, even older hardware, with smooth and fast performance.\n* 📦 **Low storage?** No problem! We can install it in **less than 10 GB**.\n\n---\n\n### ⚡ Seamless, Fast, and Reliable\n\nOur technicians ensure everything is optimized — from installation to setup —\nso your computer runs faster, cleaner, and smoother than ever before.\n\n---\n\n### 💬 Ready to Get Started?\n\nContact us today and let **Werya** bring your PC back to life —\nall in less than an hour, for just **100 EGP!** 💙\n\n"
  },
  {
    "id": "install-hackintoch",
    "nameAr": "تثبيت MacOS",
    "nameEn": "Install MacOS",
    "descriptionAr": "حوّل جهازك العادي لماك حقيقي! عيش تجربة macOS الكاملة بأداء وسرعة وأناقة — وريا هتظبطلك كل حاجة. 🍏💻",
    "descriptionEn": "Turn your normal PC into a real Mac! Experience full macOS performance, speed, and design — all installed and optimized by Wirya’s experts. 💻",
    "category": "cat-1762126199121",
    "price": 200,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/mac.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24130641436637458/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### 🍏 ثبّت نظام macOS على أي جهاز عادي مع وريا\n\n### عيش تجربة الماك الكاملة… بدون ما تشتري جهاز ماك 💻✨\n\nنفسك تجرب نظام **macOS** لكن جهازك مش من Apple؟\nمع **وريا** تقدر تحوّل جهازك العادي إلى **ماك حقيقي** بأداء ثابت وسرعة عالية،\nوتستمتع بكل مميزات نظام Apple في تجربة سلسة وجاهزة للشغل فورًا.\n\n---\n\n### 💡 **ليه تختار وريا؟**\n\n* 🍎 نقدر نثبت **macOS على أي جهاز متوافق** مع متطلبات النظام.\n* ⚙️ النظام بيشتغل **بثبات وسلاسة** كأنه ماك أصلي.\n* 💼 كل البرامج والتعريفات الأساسية **متظبطة وجاهزة**.\n* 🔊 الواي فاي، الصوت، البلوتوث وكل الإكسسوارات **شغالة بكفاءة**.\n* 🚀 أداء سريع، واجهة أنيقة، وتجربة استخدام فخمة بمعنى الكلمة.\n\n---\n\n### ⚡ تسطيب احترافي بدون صداع\n\nإحنا بنتكفل بكل التفاصيل:\nمن إعداد النظام وضبط الإقلاع،\nلحد تعريف المكونات وضبط الأداء —\nعلشان جهازك يشتغل **جاهز 100% من أول لحظة تشغيل**.\n\n---\n\n### 💬 جرّب macOS على جهازك دلوقتي!\n\nمش لازم تشتري ماك علشان تعيش التجربة 😎\nخلي **وريا** تحوّل جهازك العادي إلى ماك احترافي بأمان وسعر مميز 💙\n\n📱 **كلّمنا على واتساب** واحجز خدمتك النهارده،\nوخلي جهازك يعيش حياة جديدة بنظام Apple! 🍏\n",
    "longDescriptionEn": "### 🍏 Install macOS on Any PC — with Wirya\n\n### Experience macOS Like Never Before 💻✨\n\nWant to try macOS but don’t own a Mac?\nWith **Werya**, you can turn your regular computer into a **fully functional macOS system (Hackintosh)** — smooth, stable, and beautifully optimized!\n\n---\n\n### 💡 **Why Choose Werya?**\n\n* 🍎 Install **macOS on almost any device** that meets compatibility standards.\n* ⚙️ Fully **optimized and stable performance**, just like a real Mac.\n* 💼 All **essential drivers and tools pre-configured** for perfect operation.\n* 🔊 Audio, Wi-Fi, Bluetooth, and all hardware features are properly set up.\n* 🚀 Fast, elegant, and fully customized macOS experience.\n\n---\n\n### ⚡ Smooth Setup, Zero Hassle\n\nWe handle every detail — from configuration and bootloader setup\nto system optimization and compatibility tweaks —\nso your Hackintosh runs perfectly **from the very first startup.**\n\n---\n\n### 💬 Ready to Experience macOS?\n\nEnjoy the elegance and power of Apple’s system **without buying a Mac**!\nLet **Wirya** install macOS on your PC safely and professionally — all at a great price 💙\n\n📱 **Contact us on WhatsApp** to book your installation today. 🍏\n\n"
  },
  {
    "id": "data-restore",
    "nameAr": "إستعادة الملفات المحذوفة",
    "nameEn": "ٌٌُRestore Deleted Files",
    "descriptionAr": "ملفاتك اتمسحت؟ متقلقش! وريا تقدر ترجّعها بأمان وكفاءة — على حسب حالة الجهاز. 💾💙",
    "descriptionEn": "Lost your files? Don’t panic! Wirya can recover your deleted data safely and efficiently — depending on your device’s condition. 💾💙",
    "category": "cat-1762126223203",
    "price": 200,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/data-restore.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24566972849580852/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "\n\n---\n\n## 🇪🇬 **الوصف التفصيلي (Markdown - عربي)**\n\n### 💾 استعادة الملفات المحذوفة مع وريا\n\n### لأن فقدان الملفات مش دايمًا يعني إنها راحت للأبد 💙\n\nمسحت ملفاتك بالغلط؟ أو الجهاز اتفرمت؟\nلسه في أمل! 💪\nمع **وريا** نقدر نحاول **نسترجع ملفاتك بأمان وكفاءة** باستخدام أدوات احترافية —\nوده طبعًا **بيعتمد على حالة الجهاز والمساحة اللي كانت عليها البيانات.**\n\n---\n\n### 💡 **إيه اللي نقدر نرجعه؟**\n\n* 📸 الصور والفيديوهات والملفات الشخصية\n* 💼 ملفات الشغل والمشاريع\n* 🎮 بيانات الألعاب والتطبيقات\n* 💾 بيانات الهاردات والفلاشات وكروت الميموري\n\n---\n\n### ⚠️ **معلومة مهمة:**\n\nنسبة نجاح الاسترجاع بتعتمد على حالة الجهاز وعدد العمليات اللي تمت بعد الحذف.\nكل ما تتواصل أسرع، **تكون فرصة استرجاع البيانات أكبر.**\n\n---\n\n### 💬 متستسلمش للي ضاع!\n\nخلّي **وريا** تتعامل مع الموقف بأمان واحترافية،\nوهنعمل كل اللي نقدر عليه علشان نرجعلك ملفاتك.\n\n📱 **كلّمنا على واتساب دلوقتي** وشوف نقدر نرجعلك إيه 💙\n\n---\n\nهل تحب أجهزلك **HTML نسخة ويب** منها كصفحة جاهزة تضيفها على موقع وريا بنفس التنسيق والستايل؟\n",
    "longDescriptionEn": "### 💾 Recover Your Deleted Files with Wirya\n\n### Because Losing Data Doesn’t Have to Mean It’s Gone Forever 💙\n\nAccidentally deleted your files? Formatted your drive?\nWith **Wirya**, there’s still hope! Our data recovery experts use advanced tools\nto help you **restore your deleted files safely and efficiently** — depending on your device’s condition.\n\n---\n\n### 💡 **What We Can Recover:**\n\n* 📸 Photos, videos, and important documents\n* 💼 Work files and projects\n* 🎮 Game data, app files, and system backups\n* 💾 Data from HDDs, SSDs, USBs, and memory cards\n\n---\n\n### ⚠️ Important to Know\n\nRecovery success depends on your device’s current state and usage.\nThe sooner you contact us after data loss, **the higher the chance of recovery.**\n\n---\n\n### 💬 Don’t Give Up on Your Files!\n\nLet **Wirya** handle the recovery process safely and professionally.\nWe’ll do everything possible to bring your data back.\n\n📱 **Contact us now on WhatsApp** and let’s see what we can recover for you! 💙"
  },
  {
    "id": "data-decryption ",
    "nameAr": "فك تشفير الملفات",
    "nameEn": "Data Decryption",
    "descriptionAr": "لو ملفاتك اتقفلت بسبب فيروس فدية، متقلقش! وريا تقدر تساعدك تفك التشفير وتحاول ترجّع بياناتك بأمان واحترافية 🔐💻",
    "descriptionEn": "Got hit by ransomware? Don’t panic! Werya can help decrypt your files and recover your data safely and professionally — all for just 200 EGP. 🔐💻",
    "category": "cat-1762126223203",
    "price": 500,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/decryption.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24012782931755785/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### لأن بياناتك تستحق فرصة تانية 💙\n\nفيروسات الفدية (Ransomware) بتقفل ملفاتك وتطلب فدية مقابل فكها،\nلكن مش دايمًا الحل إنك تدفع!\nفريق **وريا** جاهز يتعامل مع الموقف باحترافية ويستخدم أحدث الأدوات لمحاولة **فك التشفير واسترجاع بياناتك** بأمان تام.\n\n---\n\n### 💡 **إيه اللي بنقدمه؟**\n\n* 🔍 فحص نوع الفيروس وتحليل التشفير\n* 🛡 تنظيف الجهاز ومنع انتشار العدوى\n* 🧰 محاولات فك التشفير بأدوات وتقنيات متقدمة\n* 💾 استرجاع الملفات من النسخ الظلية أو النسخ الاحتياطية (لو متاحة)\n* 📑 تقرير شامل بالحالة والنتائج\n\n---\n\n### ⚠️ **ملاحظات مهمة:**\n\n* نسبة النجاح بتعتمد على نوع الفيروس وحالة الملفات.\n* لازم تكون **المالك القانوني** للبيانات أو معاك تصريح من المالك.\n* كل ما تتواصل أسرع، تكون فرصة الاسترجاع أعلى.\n\n---\n\n### 💵 **السعر:** 200 جنيه فقط\n\nخدمة سريعة، سرية، واحترافية من فريق وريا.\n📱 **كلّمنا على واتساب دلوقتي** وخلّينا نساعدك تسترجع بياناتك. 💙",
    "longDescriptionEn": "### Because your data deserves another chance 💙\n\nRansomware locks your files and demands payment to unlock them —\nbut paying isn’t always the solution.\nAt **Werya**, we use professional tools and advanced techniques to **analyze, decrypt, and recover** your files safely and efficiently.\n\n---\n\n### 💡 **What We Offer:**\n\n* 🔍 Identify and analyze the ransomware type\n* 🛡 Clean the device and prevent further infection\n* 🧰 Attempt file decryption with professional tools\n* 💾 Recover from backups or shadow copies if available\n* 📑 Provide a detailed report on recovery results\n\n---\n\n### ⚠️ **Important Notes:**\n\n* Success depends on the ransomware type and file condition.\n* You must be the **legal owner** of the data or authorized by them.\n* The sooner you contact us, the higher the recovery chance.\n\n---\n\n### 💵 **Price:** Only 200 EGP\n\nFast, confidential, and professional ransomware decryption by Werya.\n📱 **Contact us now on WhatsApp** and let’s get your data back! 💙"
  },
  {
    "id": "web-store",
    "nameAr": "إنشاء متجر الكتروني",
    "nameEn": "Online store",
    "descriptionAr": "ابدأ تجارتك أونلاين بسهولة مع وريا! 💙\nمتجر إلكتروني احترافي يبيع، يستقبل الطلبات، ويدعم الدفع أونلاين — بأسعار تبدأ من 2000 جنيه بس! 🚀",
    "descriptionEn": "Start your online business with ease! 💙\nGet your professional eCommerce store that sells, takes orders, and accepts online payments — starting from 2000 EGP only! 🚀",
    "category": "cat-1762126362691",
    "price": 2000,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/web-store.png",
    "previewImages": [],
    "attributes": [],
    "options": [
      {
        "id": "opt-1762150710841",
        "nameAr": "موقع ثابت (دفع لمرة واحدة)",
        "nameEn": "static website",
        "priceModifier": 0
      },
      {
        "id": "opt-1762150735051",
        "nameAr": "موقع مرن",
        "nameEn": "dynamic website",
        "priceModifier": 3000
      }
    ],
    "whatsappLink": "https://wa.me/p/24119629027731421/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### لأن النجاح في التجارة أونلاين محتاج بداية صح 💙\n\n🚀 عايز تبدأ مشروعك أونلاين ومش عارف منين؟\nولا تشيل هم! مع **وريا** هتقدر تمتلك متجر إلكتروني احترافي جاهز للبيع أونلاين،\nيستقبل الطلبات، ويدعم الدفع الإلكتروني — بسهولة وسرعة من غير أي صداع تقني!\n\n---\n\n### 💡 **مميزات الخدمة:**\n\n* 🎯 **تصميم احترافي وسهل الاستخدام**\n* ⚡️ **سرعة وأداء ممتاز** على كل الأجهزة\n* 📱 **متوافق مع الموبايل** بنسبة 100%\n* 🧑‍💻 **دعم فني مستمر** معاك خطوة بخطوة\n* 🎨 **تحكم كامل في التصميم:** غيّر الألوان، الصفحات، واللوجو زي ما تحب\n* 📦 **نظام متابعة أوردرات متكامل** من الطلب لحد باب العميل\n* 💳 **دفع أونلاين آمن وسهل**\n* 🛍️ **خيارات مخصصة لمنتجاتك** وعروض حصرية\n\n---\n\n### 💵 **الأسعار:**\n\nابدأ دلوقتي بأسعار تبدأ من **2000 جنيه فقط**\nواختار الباقة اللي تناسب نشاطك التجاري وحجم متجرك.\n\n---\n\n### 💬 جاهز تبدأ؟\n\n📩 ابعتلنا رسالة دلوقتي،\nوفريق **وريا** هيبدأ معاك رحلة بناء متجرك أونلاين خطوة بخطوة! 💙",
    "longDescriptionEn": "### Because success online starts with the right setup 💙\n\n🚀 Want to start selling online but don’t know where to begin?\nNo worries — **Werya** makes it simple!\nWe’ll build your **professional eCommerce store** that sells products, takes orders, and accepts online payments — all without the technical headache!\n\n---\n\n### 💡 **Service Features:**\n\n* 🎯 **Professional, user-friendly design**\n* ⚡️ **Fast performance** across all devices\n* 📱 **Fully mobile responsive**\n* 🧑‍💻 **Step-by-step technical support**\n* 🎨 **Full customization:** change colors, pages, and logo easily\n* 📦 **Order tracking system** from checkout to delivery\n* 💳 **Secure online payment integration**\n* 🛍️ **Exclusive product features and offers**\n\n---\n\n### 💵 **Pricing:**\n\nPlans start from **2000 EGP only**,\nwith flexible options tailored to your business needs.\n\n---\n\n### 💬 Ready to Start?\n\n📩 Message us now and the **Werya** team will help you launch your online store — fast, professional, and ready to sell! 💙"
  },
  {
    "id": "thermal-replacment",
    "nameAr": "تغيير المعجون الحراري",
    "nameEn": "Thermal Paste Replacement",
    "descriptionAr": "الحر مش بس بيأثر على البشر 😅 — كمان بيقتل الأجهزة!\nغيّر المعجون الحراري مع وريا وخلّي جهازك يبرد ويرجع لأداءه الطبيعي، بسعر يبدأ من **50 جنيه** 💻❄️",
    "descriptionEn": "Heat doesn’t just affect people — it kills devices too! 😅\nReplace your CPU thermal paste with **Werya** and keep your PC cool and fast, starting from **50 EGP** 💻❄️",
    "category": "cat-1762126339955",
    "price": 50,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/thermal.png",
    "previewImages": [],
    "attributes": [],
    "options": [
      {
        "id": "opt-1762152039609",
        "nameAr": "جبنة فيتا",
        "nameEn": "Veta cheese",
        "priceModifier": 0
      },
      {
        "id": "opt-1762152073932",
        "nameAr": "معجون عادي",
        "nameEn": "normal thermal paste",
        "priceModifier": 30
      },
      {
        "id": "opt-1762152098350",
        "nameAr": "معجون محترم",
        "nameEn": "high quality thermal paste",
        "priceModifier": 100
      }
    ],
    "whatsappLink": "https://wa.me/p/30786779197634282/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### لأن الحر مش بس مؤذي للبشر… الأجهزة كمان بتختنق منه 😅💙\n\nالحر الشديد ممكن يبوّظ أي جهاز!\nلو المعالج بيسخن أكتر من اللازم، الأداء بيقل، والجهاز ممكن يهنّج أو حتى يتلف 😨\n\nعلشان كده، **وريا** بتقدملك خدمة **تغيير المعجون الحراري للمعالج** باحترافية،\nعشان تضمن تبريد ممتاز، أداء أعلى، وحماية أطول لعمر جهازك.\n\n---\n\n### 💡 **إيه اللي بنعمله؟**\n\n* 🧰 تنظيف المعالج من المعجون القديم تمامًا\n* ❄️ وضع معجون حراري جديد عالي الجودة\n* ⚙️ التأكد من توزيع الحرارة بشكل سليم\n* 🧊 فحص سرعة المراوح وتدفق الهواء داخل الجهاز\n* 💻 اختبار الأداء ودرجات الحرارة بعد التبديل\n\n---\n\n### ⚠️ **ليه مهم تغير المعجون؟**\n\n* يقلل الحرارة ويحافظ على أداء المعالج\n* يمنع تلف المكونات الداخلية\n* يطوّل عمر الجهاز\n* يحسّن كفاءة التشغيل خصوصًا في الصيف\n\n---\n\n### 💵 **السعر:** يبدأ من **50 جنيه** فقط\n\nخدمة سريعة، آمنة، وبتتنفذ على إيد فنيين محترفين من **وريا** 💙\n\n📱 **كلمنا دلوقتي** واحجز زيارة فنية لتجديد معجون جهازك وتخليه يبرد زي زمان! ❄️",
    "longDescriptionEn": "### Because heat doesn’t just hurt people — it kills devices too! 😅💙\n\nExtreme heat can damage your PC!\nWhen the processor overheats, performance drops, freezes increase,\nand components like the GPU or motherboard may even fail.\n\nThat’s why **Werya** offers a professional **thermal paste replacement service**\nto keep your CPU cool, efficient, and performing like new.\n\n---\n\n### 💡 **What We Do:**\n\n* 🧰 Clean the old thermal paste completely\n* ❄️ Apply high-quality new thermal paste\n* ⚙️ Ensure proper heat distribution\n* 🧊 Check fan performance and airflow\n* 💻 Test temperatures and performance after replacement\n\n---\n\n### ⚠️ **Why It Matters:**\n\n* Reduces heat and improves CPU performance\n* Prevents internal damage\n* Extends hardware lifespan\n* Enhances stability and efficiency, especially in summer\n\n---\n\n### 💵 **Price:** Starting from **50 EGP**\n\nFast, safe, and professional service by **Werya’s** tech experts 💙\n\n📱 **Contact us now** and give your PC a breath of fresh, cool air! ❄️"
  },
  {
    "id": "device-check",
    "nameAr": "فحص وتشخيص اعطال",
    "nameEn": "device check-up and diagnostics",
    "descriptionAr": "فحص مجاني لجهازك وتشخيص الأعطال مع نصائح لتحسين الأداء — من وريا ولحد عندك! 💙\nكل دا بـ **0 جنيه** ومش لفترة محدودة ✨",
    "descriptionEn": "Free device check-up and diagnostics with personalized performance tips — from Werya, right at your doorstep! 💙\nAll that for **0 EGP**, and it’s **not for a limited time!** ✨",
    "category": "cat-1762126296304",
    "price": 0,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/scan.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/31072452745702237/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### لأنك تستحق تعرف سبب المشكلة قبل ما تدفع 💙\n\n🎯 بدل ما تروح مراكز الصيانة عشان “تعرف العطل وبس”،\n**وريا** هتختصر عليك المشوار وهتيجي لحد عندك،\nتفحص جهازك، تحدد المشكلة، وتديك **نصائح مخصصة لتحسين الأداء** — وكل دا **مجانًا تمامًا!** 😍\n\n---\n\n### 💡 **إيه اللي هنعمله؟**\n\n* 🔍 فحص شامل للجهاز وتشخيص الأعطال\n* ⚙️ تحديد السبب الحقيقي للمشكلة\n* 💡 نصائح لتحسين الأداء وتسريع الجهاز\n* 🧰 اقتراح الحلول المناسبة قبل أي تصليح\n* 💬 إجابات على أي استفسار تقني عندك\n\n---\n\n### ⚠️ **ليه الخدمة دي مهمة؟**\n\n* بتعرف وضع جهازك الحقيقي بدون ما تدفع حاجة\n* بتفهم سبب المشكلة قبل ما تبدأ التصليح\n* بتاخد استشارة فنية احترافية ومخصصة لجهازك\n\n---\n\n### 💵 **السعر؟ ولا مليم!**\n\nالخدمة **مجانية 100% ومش لفترة محدودة** ✨\n📱 **كلّمنا حالاً** واحجز فحص لجهازك — فريق **وريا** هييجي لحد عندك يشخصلك الجهاز باحترافية وبدون أي تكلفة 💙",
    "longDescriptionEn": "### Because you deserve to know the problem before you pay 💙\n\n🎯 Instead of visiting a repair shop just to “find out what’s wrong,”\n**Werya** brings the diagnosis **to you**!\nWe’ll inspect your device, identify the issue, and give you **personalized performance tips** — all **completely free!** 😍\n\n---\n\n### 💡 **What’s Included:**\n\n* 🔍 Full system inspection and diagnostics\n* ⚙️ Identify the real cause of hardware or software issues\n* 💡 Personalized tips to boost performance\n* 🧰 Suggested solutions before any repair\n* 💬 Expert answers to all your tech questions\n\n---\n\n### ⚠️ **Why It Matters:**\n\n* Know your device’s condition before paying anything\n* Understand the problem clearly before repair\n* Get a **professional, tailored consultation** for your setup\n\n---\n\n### 💵 **Price? Absolutely FREE!**\n\nThis service is **100% free and not limited by time** ✨\n📱 **Contact us now** and the **Werya** team will come to your place,\ndiagnose your device professionally — for **0 EGP!** 💙"
  },
  {
    "id": "pc-unlcok-password",
    "nameAr": "فك كلمة مرور الأجهزة",
    "nameEn": "Password Unlock Service",
    "descriptionAr": "نسيت باسورد اللابتوب؟ متقلقش! 💙\nوريا هتفتحلك الجهاز في أقل من 15 دقيقة من غير ما تمسح الويندوز أو تفقد بياناتك — وكل دا بـ 50 جنيه بس! 🔐💻",
    "descriptionEn": "Forgot your laptop password? No worries! 💙\nWerya unlocks your device in under 15 minutes — no data loss, no reinstall needed, and all for just 50 EGP! 🔐💻",
    "category": "cat-1762126296304",
    "price": 50,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/data-restore.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24897444306513830/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "تمام 👌\nدي الباكدج الكاملة لخدمة **فتح باسورد اللابتوب المنسي (بدون مسح الويندوز)** من **وريا**، بنفس تنسيق الخدمات السابقة:\n(وصف قصير عربي + إنجليزي + وصف تفصيلي بالـMarkdown بالعربي والإنجليزي).\n\n---\n\n## 💙 **الوصف القصير (عربي)**\n\nنسيت باسورد اللابتوب؟ متقلقش! 💙\nوريا هتفتحلك الجهاز في أقل من 15 دقيقة من غير ما تمسح الويندوز أو تفقد بياناتك — وكل دا بـ **50 جنيه بس!** 🔐💻\n\n---\n\n## 💙 **Short Description (English)**\n\nForgot your laptop password? No worries! 💙\nWerya unlocks your device in under 15 minutes — **no data loss, no reinstall needed**, and all for **just 50 EGP!** 🔐💻\n\n---\n\n### لأن النسيان وارد… بس إعادة تسطيب الويندوز مش الحل 😅💙\n\nلو نسيت باسورد اللابتوب،\nأول حاجة بتفكر فيها: \"أسطب ويندوز جديد وخلاص!\"\nلكن كده هتضيع كل حساباتك وبرامجك وإعداداتك 😩\n\nمع **وريا**، مش محتاج تمسح حاجة!\nاحنا بنقدملك خدمة **فتح باسورد اللابتوب** باحترافية تامة،\nمن غير ما نمسح الويندوز أو نلمس ملفاتك.\n\n---\n\n### 💡 **إيه اللي بنقدمه؟**\n\n* 🔓 فتح باسورد الجهاز بدون فورمات\n* 💾 الحفاظ على كل الملفات والبرامج والحسابات\n* ⚙️ الخدمة متاحة لكل إصدارات الويندوز\n* 🕐 التنفيذ في أقل من 15 دقيقة\n* 🧑‍💻 الخدمة على إيد فنيين محترفين من وريا\n\n---\n\n### ⚠️ **ملاحظات مهمة:**\n\n* الخدمة لفك **كلمة المرور المنسية فقط**، مش لاسترجاعها.\n* بنقدّمها للمالك الشرعي للجهاز فقط.\n* لو الجهاز عليه حساب Microsoft، بنوضح الخطوات القانونية المرتبطة به.\n\n---\n\n### 💵 **السعر:** 50 جنيه فقط\n\nخدمة سريعة، آمنة، ومضمونة — من **وريا** 💙\n📱 **كلّمنا دلوقتي** وهنرجعلك الوصول لجهازك من غير وجع دماغ ولا تسطيب من الأول!",
    "longDescriptionEn": "### Forgetting your password happens… but reinstalling Windows isn’t the solution 😅💙\n\nIf you forgot your laptop password,\nyou might think the only fix is to reinstall Windows —\nbut that means losing your apps, settings, and saved accounts 😩\n\nWith **Werya**, you don’t need to erase anything!\nWe offer a professional **password unlock service** that restores access to your device\nwithout deleting Windows or your files.\n\n---\n\n### 💡 **What We Offer:**\n\n* 🔓 Unlock your laptop password without formatting\n* 💾 Keep all your data, apps, and settings intact\n* ⚙️ Works with all Windows versions\n* 🕐 Done in under 15 minutes\n* 🧑‍💻 Handled by professional Werya technicians\n\n---\n\n### ⚠️ **Important Notes:**\n\n* This service **unlocks** your device but does **not recover** or reveal the password.\n* Only provided to the **legal owner** of the device.\n* If your laptop is linked to a Microsoft account, we’ll guide you through the official recovery process.\n\n---\n\n### 💵 **Price:** Only 50 EGP\n\nFast, safe, and professional — from **Werya** 💙\n📱 **Contact us now** and regain access to your device in minutes, no data loss, no hassle!"
  },
  {
    "id": "install-programs",
    "nameAr": "تثبيت البرامج دفعة واحدة",
    "nameEn": "All Your Programs at Once",
    "descriptionAr": "ثبّت أي مجموعة برامج دفعة واحدة — مهما كان عددها — بسعر ثابت 50 جنيه! 💻\nمن الأوفيس لبرامج التصميم والهندسة والبرمجة وكل اللي تتخيله! ⚡️",
    "descriptionEn": "Install any collection of programs all at once — no limits, one fixed price: **50 EGP!** 💻\nFrom Office and engineering tools to programming and design software — we’ve got it all! ⚡️",
    "category": "cat-1762126339955",
    "price": 50,
    "currency": "EGP",
    "stock": 0,
    "inStock": true,
    "image": "/install-programs.png",
    "previewImages": [],
    "attributes": [],
    "options": [],
    "whatsappLink": "https://wa.me/p/24127092270294305/201067790350",
    "detailedDescAr": "",
    "detailedDescEn": "",
    "longDescriptionAr": "### لأن وقتك أغلى من إنك تفضل تثبّت برنامج ورا التاني 😅💙\n\nدلوقتي مع **وريا**، تقدر تثبّت كل البرامج اللي محتاجها مرة واحدة — بسرعة، باحتراف، ومن غير وجع دماغ!\n\n---\n\n### 💡 **تشمل الخدمة:**\n\n* 🔹 جميع إصدارات **Microsoft Office**\n* 🔹 برامج **الأدوبـي (Photoshop, Illustrator, Premiere, After Effects …)**\n* 🔹 برامج التصميم الهندسي زي **AutoCAD** و **Revit**\n* 🔹 أدوات البرمجة: **VS Code, Visual Studio, Android Studio …**\n* 🔹 وأي برامج أو أدوات تانية حتى لو مش معروفة!\n\n---\n\n### ⚙️ **مميزات الخدمة:**\n\n* تثبيت كل البرامج المطلوبة دفعة واحدة\n* إعدادات وضبط تلقائي بعد التثبيت\n* بدون أي ملفات مؤقتة أو إعلانات مزعجة\n* توافق كامل مع جميع إصدارات الويندوز\n* 🔐 تنفيذ آمن على إيد فنيين محترفين\n\n---\n\n### 💵 **السعر:**\n\nمهما كان عدد البرامج، السعر **موحد — 50 جنيه بس!** 😍\n\n📩 كلمنا دلوقتي وخلي جهازك جاهز في وقت قياسي مع **وريا** 💙",
    "longDescriptionEn": "### Because your time’s too valuable to install apps one by one 😅💙\n\nWith **Werya**, you can install all your needed software in one go — fast, clean, and hassle-free!\n\n---\n\n### 💡 **Included in the Service:**\n\n* 🔹 All **Microsoft Office** editions\n* 🔹 All **Adobe Creative Suite** programs (Photoshop, Illustrator, Premiere, After Effects, etc.)\n* 🔹 Engineering tools like **AutoCAD** and **Revit**\n* 🔹 Programming tools: **VS Code, Visual Studio, Android Studio, and more**\n* 🔹 Any custom or less-known programs you need!\n\n---\n\n### ⚙️ **Features:**\n\n* Install everything at once — no waiting\n* Full configuration and setup\n* No temporary junk or ads\n* Compatible with all Windows versions\n* 🔐 Safe, professional installation by Werya experts\n\n---\n\n### 💵 **Price:**\n\nNo matter how many programs you need — **just 50 EGP!** 😍\n\n📩 **Contact Werya now** and get your system fully set up in no time! 💙"
  }
]

export const SERVICES = services
export const SERVICE_CATEGORIES = serviceCategories
