/* =========================================================
   NAV LINKS
   ─────────────────────────────────────────────────────────
   These ids must match the `id` attribute on each section.
   Current sections in your app: #hero, #about, #work
   ========================================================= */

export const navLinks = [
    { name: "Home",         link: "#hero"         },
    { name: "About",        link: "#about"        },
    { name: "Projects",     link: "#work"         },
    { name: "Education",    link: "#education"    },
    { name: "Skills",       link: "#skills"       },
    { name: "Certificates", link: "#certificates" },
];


/* =========================================================
   HERO WORD SLIDER
   ─────────────────────────────────────────────────────────
   5 unique words + 1 duplicate of the first.
   The duplicate makes the loop restart invisibly.

   ⚠️ The number of entries here MUST equal the number of
      steps in the `heroWordLoop` keyframe in index.css.
   ========================================================= */

export const words = [
    { text: "Ideas",    imgPath: "/images/ideas.svg"    },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs",  imgPath: "/images/designs.svg"  },
    { text: "Code",     imgPath: "/images/code.svg"     },
    { text: "Research", imgPath: "/images/research.svg" },

    // ⬇ Duplicate of the FIRST entry — required for a seamless loop
    { text: "Ideas",    imgPath: "/images/ideas.svg"    },
];


/* =========================================================
   COUNTER STATS
   ========================================================= */

export const counterItems = [
    {
        value: 2,
        suffix: "+",
        label: "Years Coding",
        sublabel: "Python · ML · Research",
    },
    {
        value: 5,
        suffix: "+",
        label: "Projects Built",
        sublabel: "End-to-end AI systems",
    },
    {
        value: 10,
        suffix: "+",
        label: "Technologies",
        sublabel: "Frameworks & Tools",
    },
    {
        value: 3,
        suffix: "",
        label: "Certifications",
        sublabel: "AI · Data Science",
    },
];


export const projects = [
    {
        title:
            "DLR-PCVW: A Lesion-Aware Distribution-Weighted Framework for Few-Shot Dermatological Severity",
        shortDescription:
            "An acne severity model using distribution-aware learning on top of an EfficientNet-B0 backbone.",
        longDescription:
            "DLR-PCVW (Distribution-Weighted Lesion Regression with Predictive Confidence Weighting) is a framework for few-shot dermatological severity scoring. It combines a lightweight EfficientNet-B0 backbone with a two-head regressor that predicts both the mean severity score and its variance. The variance is used to weight the loss during training, so the model learns to trust confident samples more and down-weight ambiguous lesions. The pipeline includes custom preprocessing, augmentation tuned for dermatological images, and a Streamlit demo for single-image inference.",
        image: "/images/project1.png",
        year: "2026",
        tags: ["Deep Learning", "Computer Vision", "Healthcare"],
        tools: [
            { name: "PyTorch", icon: "/images/tools/PyTorch.svg" },
            { name: "NumPy",   icon: "/images/tools/numpy.svg"   },
            { name: "OpenCV",  icon: "/images/tools/OpenCV.svg"  },
            { name: "EfficientNet-BO",  icon: "/images/tools/model.svg"  },
        ],
        github: "https://github.com/iamthearafatkhan/DLR-PCVW-Acne-severity-classifier-using-few-shot",
        website: "https://acnegrad-ai.streamlit.app/",
    },
    {
        title: "E-Mail Spam Detection",
        shortDescription:
            "A machine learning classifier that separates spam from legitimate email using NLP preprocessing.",
        longDescription:
            "An end-to-end spam detection system built with classical NLP techniques and ensemble models. The pipeline starts with text normalization — HTML stripping, tokenization, stemming, and stop-word removal — followed by TF-IDF vectorization. Multiple classifiers (Multinomial Naive Bayes, Linear SVM, and a soft-voting ensemble) are trained and evaluated on a labelled email corpus. The final model achieves over 98% accuracy on held-out data and exposes a simple REST endpoint for real-time classification.",
        image: "/images/project2.png",
        year: "2025",
        tags: ["NLP", "Machine Learning", "Scikit-learn"],
        tools: [
            { name: "StreamLit", icon: "/images/tools/Streamlit.svg" },
            { name: "NumPy",        icon: "/images/tools/numpy.svg"   },
            { name: "Pandas",       icon: "/images/tools/Pandas.svg"  },
            { name: "Pytorch",       icon: "/images/tools/PyTorch.svg"  },
        ],
        github: "https://github.com/iamthearafatkhan/Email-Spam-Detection",
        website: "https://email-spam-detection23.streamlit.app/",
    },
    {
        title: "Diabetes Prediction",
        shortDescription:
            "A predictive model that estimates diabetes risk from clinical features with an interactive front end.",
        longDescription:
            "A clinical decision-support tool that predicts diabetes risk from routine health measurements — glucose level, BMI, age, blood pressure, and family history. The model was trained on the Pima Indians Diabetes dataset using gradient-boosted trees, with careful handling of class imbalance via SMOTE and hyperparameter tuning through randomized search. The app exposes SHAP-based feature explanations so a user can see which inputs most influenced the model's decision. The front end is a Streamlit dashboard with slider inputs, live probability display, and a downloadable PDF report.",
        image: "/images/project3.png",
        year: "2023",
        tags: ["Machine Learning", "Neural Network", "Flask"],
        tools: [
            { name: "scikit-learn", icon: "/images/tools/scikit-learn.svg"   },
            { name: "Neural Network", icon: "/images/tools/model.svg"   },
            { name: "Flask",    icon: "/images/tools/flask.svg" },
        ],
        github: "https://github.com/iamthearafatkhan/Diabetes-Prediction-using-Flask",
        website: "https://github.com/iamthearafatkhan/Diabetes-Prediction-using-Flask",
    },
];


/* =========================================================
   EDUCATION
   ========================================================= */

export const educationItems = [
    {
        institution: "Premier University Chittagong",
        location: "Chattogram, Bangladesh",
        year: "2021 – 2026",
        degree: "BSc in Computer Science & Engineering",
        logo: "/images/edu/puc_logo.png",
    },
    {
        institution: "Omargani M.E.S. College",
        location: "Chattogram, Bangladesh",
        year: "2018 – 2020",
        degree: "HSC · Science",
        logo: "/images/edu/mes.jpg",
    },
    {
        institution: "Municipal Model High School",
        location: "Chattogram, Bangladesh",
        year: "2013 – 2018",
        degree: "SSC · Science",
        logo: "/images/edu/municipal.png",
    },
];


/* =========================================================
   SKILLS
   ─────────────────────────────────────────────────────────
   level: "intermediate" (>= 50) or "beginner" (< 50)
   percent: shown on hover
   icon: your SVG/PNG inside /images/skills/
   ========================================================= */

export const skillGroups = [
    {
        category: "Languages",
        skills: [
            { name: "Python",  icon: "/images/tools/python.svg",  percent: 72, level: "intermediate" },
            { name: "C / C++", icon: "/images/tools/C++.svg",     percent: 38, level: "beginner"     },
            { name: "Java",    icon: "/images/tools/java.svg",    percent: 32, level: "beginner"     },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML", icon: "/images/tools/HTML5.svg", percent: 78, level: "intermediate" },
            { name: "CSS",  icon: "/images/tools/CSS3.svg",  percent: 70, level: "intermediate" },
            { name: "Tailwind CSS",  icon: "/images/tools/Tailwind-CSS.svg",  percent: 35, level: "beginner" },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Flask",     icon: "/images/tools/flask.svg",     percent: 62, level: "intermediate" },
            { name: "MySQL",     icon: "/images/tools/MySQL.svg",     percent: 68, level: "intermediate" },
            { name: "Streamlit", icon: "/images/tools/Streamlit.svg", percent: 42, level: "beginner"     },
            { name: "Django",    icon: "/images/tools/Django.svg",    percent: 30, level: "beginner"     },
        ],
    },
    {
        category: "Libraries",
        skills: [
            { name: "NumPy",        icon: "/images/tools/numpy.svg",       percent: 74, level: "intermediate" },
            { name: "Pandas",       icon: "/images/tools/Pandas.svg",      percent: 72, level: "intermediate" },
            { name: "scikit-learn", icon: "/images/tools/scikit-learn.svg",     percent: 66, level: "intermediate" },
            { name: "Matplotlib",   icon: "/images/tools/Matplotlib.svg",  percent: 68, level: "intermediate" },
            { name: "TensorFlow",   icon: "/images/tools/TensorFlow.svg",  percent: 55, level: "intermediate" },
            { name: "Seaborn",      icon: "/images/tools/seaborn.svg",     percent: 40, level: "beginner"     },
            { name: "PyTorch",      icon: "/images/tools/PyTorch.svg",     percent: 35, level: "beginner"     },
        ],
    },
    {
        category: "Tools",
        skills: [
            { name: "Git",    icon: "/images/tools/Git.svg",    percent: 68, level: "intermediate" },
            { name: "GitHub", icon: "/images/tools/GitHub.svg", percent: 70, level: "intermediate" },
            { name: "Ubuntu", icon: "/images/tools/Ubuntu.svg", percent: 45, level: "beginner"     },
        ],
    },
];


/* =========================================================
   CERTIFICATES
   ========================================================= */

export const certificates = [
    {
        title: "Diploma in Computer Graphic Design",
        issuer: "Need Computer Training Institute",
        year: "2017",
        image: "/images/certs/diploma-CSD.jpg",
        link: "Link Not found",
    },
   {
        title: "Complete Python Bootcamp 2025",
        issuer: "Udemy",
        year: "2025",
        image: "/images/certs/Python-bootcamp-2025.jpg",
        link: "https://udemy.com/certificate/UC-c8b68878-4277-4c42-901e-908fe2ff6fe3",
    },
    {
        title: "Learn JavaScript - For Beginners",
        issuer: "Udemy",
        year: "2023",
        image: "/images/certs/js-Beginner.jpg",
        link: "https://udemy.com/certificate/UC-9633167d-3dbd-4247-a608-0a5bdbf72f27",
    },
    {
        title: "Introduction to Career Skills in Software Development",
        issuer: "LinkedIn Learning",
        year: "2025",
        image: "/images/certs/Career-Skills-Software-Development.jpg",
        link: "https://udemy.com/certificate/your-id",
    },
];

/* =========================================================
   FOOTER
   ========================================================= */

export const footerInfo = {
    name: "ARAFAT",
    nameAccent: "KHAN",
    tagline: "research · build · deploy",
    email: "arafathossen21233@gmail.com",   // ← change to your real email
};

export const socials = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/iamthearafatkhan",
        icon: "/images/tools/LinkedIn.svg",
    },
    {
        name: "GitHub",
        href: "https://github.com/iamthearafatkhan",
        icon: "/images/tools/GitHub.svg",
    },
    {
        name: "X",
        href: "https://x.com/iamarafatkhan33",
        icon: "/images/tools/x.svg",
    },
    {
        name: "Facebook",
        href: "https://facebook.com/iamthearafatkhan",
        icon: "/images/tools/Facebook.svg",
    },
    {
        name: "Email",
        href: "mailto:arafathossen21233@gmail.com",
        icon: "/images/tools/gmail.svg",
    },
];
