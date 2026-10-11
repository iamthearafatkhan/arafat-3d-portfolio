/* =========================================================
   NAV LINKS
   ========================================================= */

export const navLinks = [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#work" },
    { name: "Education", link: "#education" },
    { name: "Skills", link: "#skills" },
    { name: "Certificates", link: "#certificates" },
];


/* =========================================================
   HERO WORD SLIDER
   ========================================================= */

export const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Research", imgPath: "/images/research.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
];


/* =========================================================
   COUNTER STATS
   ========================================================= */

export const counterItems = [
    { value: 2, suffix: "+", label: "Years Coding", sublabel: "Python · ML · Research" },
    { value: 5, suffix: "+", label: "Projects Built", sublabel: "End-to-end AI systems" },
    { value: 10, suffix: "+", label: "Technologies", sublabel: "Frameworks & Tools" },
    { value: 3, suffix: "", label: "Certifications", sublabel: "AI · Data Science" },
];


/* =========================================================
   PROJECTS
   ========================================================= */

export const projects = [
    {
    title: "DLR-PCVW: A Lesion-Aware Distribution-Weighted Framework for Few-Shot Dermatological Severity Assessment",
    shortDescription: "A novel few-shot learning framework designed for dermatological severity assessment (such as acne grading) under limited-data conditions, utilizing distribution-aware prototype construction, self-conditional FiLM calibration, and multi-head ordinal consistency learning.",
    longDescription: "DLR-PCVW is a specialized few-shot learning framework developed to tackle the challenges of fine-grained medical image classification when annotated data is scarce[cite: 12]. The pipeline processes facial or skin images using an EfficientNet-B0 backbone feature extractor[cite: 25, 26]. It incorporates a self-conditional Feature-wise Linear Modulation (FiLM) module for adaptive channel-wise feature recalibration[cite: 25, 37], followed by a sigmoid-based lesion response weighting mechanism to emphasize clinically significant regions like lesions, spread, and density[cite: 25, 26, 38]. Unlike conventional prototype-based methods that rely strictly on simple feature averaging, the framework constructs distribution-aware class prototypes by jointly modeling weighted mean and variance representations combined with learnable Per-Channel Variance Weighting (PCVW)[cite: 12, 25, 28]. To maintain ordinal relationships between adjacent severity grades, it leverages Gaussian Label Distribution Learning (LDL) and multi-head consistency regularization[cite: 26, 33, 36]. The framework was rigorously evaluated using episodic validation across multiple few-shot settings on benchmarks like Acne04, AGC, Mendeley, and ISIC datasets[cite: 12, 16, 48].",
    problem: "Dermatological severity assessment is clinically vital yet highly challenging due to fine-grained visual differences between adjacent grades, high intra-class variation, and the heavy reliance of conventional deep learning models on large-scale annotated datasets[cite: 14, 15]. In medical imaging, acquiring expert labels is costly, time-consuming, and constrained by privacy regulations[cite: 14, 15]. Standard few-shot learning techniques utilize simple mean-based prototype averaging, failing to capture critical distribution characteristics such as lesion spread, spatial irregularity, and density, while completely ignoring ordinal relationships among severity classes[cite: 15, 20].",
    solution: "DLR-PCVW solves this end-to-end within an episodic metric-learning paradigm[cite: 25]. First, EfficientNet-B0 extracts hierarchical feature maps which are calibrated via self-conditional FiLM[cite: 25, 26, 37]. Second, a sigmoid-based lesion scorer highlights localized lesion patterns[cite: 25, 26, 38]. Third, distribution pooling combines weighted mean (intensity) and weighted variance (spread) vectors via the Per-Channel Variance Weighting (PCVW) mechanism[cite: 25, 28, 40]. Fourth, prototypes are stabilized using Exponential Moving Average (EMA) and semantic adjustments[cite: 25, 29, 31]. Fifth, an ordinal-aware multi-head consistency learning objective with Gaussian Label Distribution Learning (LDL) is enforced to ensure smooth transitions between neighboring severity levels[cite: 26, 33, 36]. Sixth, classification is finalized using temperature-scaled cosine similarity matching[cite: 20, 32].",
    expected: "A robust, annotation-efficient alternative for dermatological severity grading that achieves superior accuracy under low-data constraints (outperforming strong baselines by up to 10.10 percentage points on the Acne04 dataset)[cite: 12]. The architecture provides stable convergence, cross-domain generalization across independent clinical repositories (AGC, Mendeley, ISIC), and interpretable visual outputs like lesion-attention heatmaps and activation overlays for clinical decision-support[cite: 12, 16, 69, 70].",
    demo: {
        notice: "Research prototype with an interactive prediction interface supporting dynamic K-shot selection, ensemble inference, and lesion-attention visualizations[cite: 73, 74].",
        accounts: [],
        tip: "Explore multi-shot configurations (1-shot, 3-shot, 5-shot, 10-shot) and inspect prototype similarity breakdowns alongside automated lesion-attention heatmaps[cite: 12, 73, 74].",
    },
    image: "/images/dlr-pcvw.png",
    year: "2026",
    tags: ["Few-Shot Learning", "Medical Imaging", "Deep Learning", "Computer Vision", "PyTorch", "Python"],
    tools: [
        { name: "Python", icon: "/images/tools/python.svg" },
        { name: "PyTorch", icon: "/images/tools/PyTorch.svg" },
        { name: "EfficientNet-B0", icon: "/images/tools/efficientnet.svg" },
        { name: "Scikit-Learn", icon: "/images/tools/scikit-learn.svg" },
        { name: "NumPy", icon: "/images/tools/numpy.svg" },
        { name: "CUDA", icon: "/images/tools/cuda.svg" },
    ],
    github: "https://github.com/iamthearafatkhan/dlr-pcvw",
    website: "https://acnegrad-ai.streamlit.app/",
}
   {
    title: "DataForge: Web-Based Data Cleaning, SQL & Analytics Platform",
    shortDescription: "A full-stack web platform where anyone can upload a CSV, Excel, or JSON file and clean it, impute missing values per column, visualize it, query it with SQL, build pivot tables, compute Excel-style formulas, and export the result.",
    longDescription: "DataForge is a browser-based data workbench built for analysts, data scientists, and students. Users upload a CSV, Excel, or JSON file and immediately get a per-column profile with data type, missingness, cardinality, distribution skew, and correlation with other columns. Each column receives a recommended imputation strategy — mean, median, mode, KNN, MICE, forward/backward fill, constant, or drop — and the user can override any recommendation per feature. Cleaning operations strip whitespace, auto-fix data types, and drop duplicates. A Plotly-powered visualization page renders histograms, box plots, violin plots, scatter matrices, time series with resampling, category heatmaps, missingness bars, missingness matrices, and correlation heatmaps, each downloadable as PNG. A SQL Studio powered by DuckDB lets users write SELECT and WITH queries against the uploaded dataset (exposed as a table named df), with results exportable as CSV or JSON. A pivot table builder supports row fields, column fields, value fields, multiple aggregations, and margins. A formula builder evaluates Excel-style expressions like =price * quantity, =IF(price > 100, \"high\", \"low\"), =UPPER(name), and =YEAR(order_date) to create new columns. Industry dashboard templates for sales, HR, finance, marketing, and quality auto-detect column roles and generate ready-made chart grids. A pipeline export feature serializes the entire preprocessing recipe — cleaning operations and per-column imputation strategies — to a YAML file, and a replay feature re-applies that exact recipe to new data using the fitted parameters from the original run, preventing train/test data leakage. Results export to CSV, Excel, JSON, or XML. Sessions are isolated per browser, stored as Parquet files, and auto-purged after 24 hours.",
    problem: "Data professionals spend 60 to 80 percent of their time on data preparation, yet the tooling landscape forces an impossible choice. Code-first tools like pandas and scikit-learn give full control but require programming skills. GUI tools like Excel and Tableau are accessible but apply crude, global transformations — the same imputation strategy to every column, no statistical imputation methods, no SQL, no leakage-safe pipeline replay. Nobody offers per-column imputation control, SQL querying, pivot tables, and Excel-style formulas in the same browser tool, for free, without installation.",
    solution: "DataForge solves this end-to-end in the browser. First, the user uploads a file and the profiler analyzes every column, producing a human-readable recommendation for how to handle it. Second, the user confirms or overrides strategies per column — KNN for a correlated numeric column, mode for a categorical one, MICE for a statistically important one. Third, cleaning operations run: whitespace stripping, dtype coercion, duplicate removal. Fourth, the user can visualize with a wide chart gallery, query with SQL via DuckDB, build pivot tables, or compute new columns with Excel-style formulas. Fifth, the entire preprocessing recipe is exportable as YAML and replayable on new data using the fitted state from the original run — the same pattern production ML pipelines use to prevent leakage. Sixth, the cleaned data exports to CSV, Excel, JSON, or XML. The tool runs on free-tier infrastructure with a keep-alive ping, so it is available to any visitor without cold-start delay.",
    expected: "A user with a messy CSV of 100 MB or less can profile every column, choose per-feature imputation, clean the data, explore it with charts, query it with SQL, build a pivot table, add computed columns with Excel-style formulas, and export the result — all in the browser, without installing anything. A teacher can give the URL to students and they can all use it for free. A recruiter can open the live link and immediately understand the tool. The whole stack — Flask, pandas, scikit-learn, DuckDB, Plotly, PyArrow, PyYAML, Gunicorn — runs on open-source software and is deployed on Render's free tier with a cron-job.org keep-alive, so there are no running costs.",
    demo: {
        notice: "No login required — upload any CSV, Excel, or JSON file to try it",
        accounts: [],
        tip: "Try the Titanic dataset (https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv) to see per-column imputation, SQL, pivot tables, and dashboards in action.",
    },
    image: "/images/dataforge.png",
    year: "2026",
    tags: ["Full-Stack", "Data Science", "Data Engineering", "Analytics", "Flask", "Python"],
    tools: [
        { name: "Flask", icon: "/images/tools/flask.svg" },
        { name: "Python", icon: "/images/tools/python.svg" },
        { name: "pandas", icon: "/images/tools/Pandas.svg" },
        { name: "scikit-learn", icon: "/images/tools/scikit-learn.svg" },
        { name: "DuckDB", icon: "/images/tools/duckdb.svg" },
        { name: "Plotly", icon: "/images/tools/plotly.svg" },
        { name: "PyArrow", icon: "/images/tools/pyarrow.svg" },
        { name: "PyYAML", icon: "/images/tools/yaml.svg" },
        { name: "Jinja2", icon: "/images/tools/jinja.svg" },
        { name: "Gunicorn", icon: "/images/tools/gunicorn.svg" },
        { name: "Render", icon: "/images/tools/render.svg" },
        { name: "Cron-job.org", icon: "/images/tools/cronjob.svg" },
    ],
    github: "https://github.com/iamthearafatkhan/dataforge",
    website: "https://dataforge-studio.onrender.com",
},
    {
        title: "CodeAssess: Online Programming Examination Platform",
        shortDescription: "A full-stack web platform where teachers create coding exams and students solve, run, and submit code that is auto-graded against hidden test cases.",
        longDescription: "CodeAssess is a full-stack web application for conducting programming exams at universities. Teachers create exams with a unique 6-character code, add questions in C, C++, Python, or Java, and define visible and hidden test cases for auto-grading. Students join with the exam code, solve problems in a Monaco-based editor, run code with custom input for debugging, and submit for automatic grading against hidden tests. Submissions are executed through a multi-provider code execution layer with automatic failover between Judge0 and onlinecompiler.io. The platform includes anti-cheat event logging, token n-gram plagiarism detection, teacher score overrides with written feedback, publish/unpublish results with letter-grade and GPA calculation, and CSV export of results. Authentication uses JWT with role-based access control.",
        problem: "Universities still run coding exams by having students code on their own computers while teachers walk around checking each screen manually. There is no automatic grading, no fair way to enforce the same hidden tests across all students, no easy way to publish results, and no scalable way to detect plagiarism. Existing platforms like HackerRank are designed for interviews, not for classroom exams with exam codes, section-based access, or teacher-owned grading workflows.",
        solution: "CodeAssess solves this end-to-end. First, teacher creates an exam and the system generates a unique join code. Second, student joins with the code, solves in a browser editor, runs code with custom input, and submits for auto-grading. Third, backend executes code in a sandboxed environment, compares output against hidden test cases, and computes a score. Fourth, teacher reviews submissions, overrides scores, adds feedback, and publishes results when ready. Anti-cheat logging and plagiarism detection run quietly in the background.",
        expected: "A teacher can create an exam and grade 30+ students without printing or manual checking. Students see consistent, objective grading from identical hidden test cases. Results are published once, viewed by all students, and exportable as CSV. Plagiarism and suspicious behaviour are flagged for teacher review. The whole flow runs on free-tier infrastructure.",
        demo: {
            notice: "Live demo - try it yourself",
            accounts: [
                {
                    role: "Teacher",
                    email: "teacher@test.com",
                    password: "teacher123",
                    capabilities: "Create exams, add questions, grade submissions, publish results",
                },
                {
                    role: "Student",
                    email: "student@test.com",
                    password: "student123",
                    capabilities: "Join exams, solve problems, submit for auto-grading",
                },
            ],
            tip: "Open in two browsers (or one incognito) to see both sides at once.",
        },
        image: "/images/codeassess.png",
        year: "2026",
        tags: ["Full-Stack", "Web Development", "EdTech", "Django", "React"],
        tools: [
            { name: "React", icon: "/images/tools/react.svg" },
            { name: "Vite", icon: "/images/tools/vitejs.svg" },
            { name: "Tailwind CSS", icon: "/images/tools/Tailwind-CSS.svg" },
            { name: "Monaco Editor", icon: "/images/tools/monaco.svg" },
            { name: "Django", icon: "/images/tools/Django.svg" },
            { name: "Django REST Framework", icon: "/images/tools/djangorest.svg" },
            { name: "PostgreSQL", icon: "/images/tools/postgresql.svg" },
            { name: "JWT", icon: "/images/tools/jwt.svg" },
            { name: "Judge0", icon: "/images/tools/compiler.svg" },
            { name: "Render", icon: "/images/tools/render.svg" },
            { name: "Vercel", icon: "/images/tools/vercel.svg" },
            { name: "Neon", icon: "/images/tools/neon.svg" },
        ],
        github: "https://github.com/iamthearafatkhan/CodeAssess",
        website: "https://codexaam.vercel.app",
    },
    {
        title: "E-Mail Spam Detection",
        shortDescription: "A machine learning classifier that separates spam from legitimate email using NLP preprocessing.",
        longDescription: "An end-to-end spam detection system built with classical NLP techniques and ensemble models. The pipeline starts with text normalization, tokenization, stemming, and stop-word removal, followed by TF-IDF vectorization. Multiple classifiers are trained and evaluated on a labelled email corpus. The final model achieves over 98% accuracy on held-out data and exposes a simple REST endpoint for real-time classification.",
        image: "/images/project2.png",
        year: "2025",
        tags: ["NLP", "Machine Learning", "Scikit-learn"],
        tools: [
            { name: "Streamlit", icon: "/images/tools/Streamlit.svg" },
            { name: "NumPy", icon: "/images/tools/numpy.svg" },
            { name: "Pandas", icon: "/images/tools/Pandas.svg" },
            { name: "PyTorch", icon: "/images/tools/PyTorch.svg" },
        ],
        github: "https://github.com/iamthearafatkhan/Email-Spam-Detection",
        website: "https://email-spam-detection23.streamlit.app/",
    },
    {
        title: "Diabetes Prediction",
        shortDescription: "A predictive model that estimates diabetes risk from clinical features with an interactive front end.",
        longDescription: "A clinical decision-support tool that predicts diabetes risk from routine health measurements including glucose level, BMI, age, blood pressure, and family history. The model was trained on the Pima Indians Diabetes dataset using gradient-boosted trees, with careful handling of class imbalance via SMOTE and hyperparameter tuning through randomized search. The app exposes SHAP-based feature explanations so a user can see which inputs most influenced the model's decision. The front end is a Streamlit dashboard with slider inputs, live probability display, and a downloadable PDF report.",
        image: "/images/project3.png",
        year: "2023",
        tags: ["Machine Learning", "Neural Network", "Flask"],
        tools: [
            { name: "scikit-learn", icon: "/images/tools/scikit-learn.svg" },
            { name: "Neural Network", icon: "/images/tools/model.svg" },
            { name: "Flask", icon: "/images/tools/flask.svg" },
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
        year: "2021 - 2026",
        degree: "BSc (Engineering) in Computer Science & Engineering",
        logo: "/images/edu/puc_logo.png",
    },
    {
        institution: "Omargani M.E.S. College",
        location: "Chattogram, Bangladesh",
        year: "2018 - 2020",
        degree: "HSC - Science",
        logo: "/images/edu/mes.jpg",
    },
    {
        institution: "Municipal Model High School",
        location: "Chattogram, Bangladesh",
        year: "2013 - 2018",
        degree: "SSC - Science",
        logo: "/images/edu/municipal.png",
    },
];


/* =========================================================
   SKILLS
   ========================================================= */

export const skillGroups = [
    {
        category: "Languages",
        skills: [
            { name: "Python", icon: "/images/tools/python.svg", percent: 72, level: "intermediate" },
            { name: "C / C++", icon: "/images/tools/C++.svg", percent: 38, level: "beginner" },
            { name: "Java", icon: "/images/tools/java.svg", percent: 32, level: "beginner" },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML", icon: "/images/tools/HTML5.svg", percent: 78, level: "intermediate" },
            { name: "CSS", icon: "/images/tools/CSS3.svg", percent: 70, level: "intermediate" },
            { name: "Tailwind CSS", icon: "/images/tools/Tailwind-CSS.svg", percent: 35, level: "beginner" },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Flask", icon: "/images/tools/flask.svg", percent: 62, level: "intermediate" },
            { name: "MySQL", icon: "/images/tools/MySQL.svg", percent: 68, level: "intermediate" },
            { name: "Streamlit", icon: "/images/tools/Streamlit.svg", percent: 42, level: "beginner" },
            { name: "Django", icon: "/images/tools/Django.svg", percent: 30, level: "beginner" },
        ],
    },
    {
        category: "Libraries",
        skills: [
            { name: "NumPy", icon: "/images/tools/numpy.svg", percent: 74, level: "intermediate" },
            { name: "Pandas", icon: "/images/tools/Pandas.svg", percent: 72, level: "intermediate" },
            { name: "scikit-learn", icon: "/images/tools/scikit-learn.svg", percent: 66, level: "intermediate" },
            { name: "Matplotlib", icon: "/images/tools/Matplotlib.svg", percent: 68, level: "intermediate" },
            { name: "TensorFlow", icon: "/images/tools/TensorFlow.svg", percent: 55, level: "intermediate" },
            { name: "Seaborn", icon: "/images/tools/seaborn.svg", percent: 40, level: "beginner" },
            { name: "PyTorch", icon: "/images/tools/PyTorch.svg", percent: 35, level: "beginner" },
        ],
    },
    {
        category: "Tools",
        skills: [
            { name: "Git", icon: "/images/tools/Git.svg", percent: 68, level: "intermediate" },
            { name: "GitHub", icon: "/images/tools/GitHub.svg", percent: 70, level: "intermediate" },
            { name: "Ubuntu", icon: "/images/tools/Ubuntu.svg", percent: 45, level: "beginner" },
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
        image: "/images/certs/diploma-CSD.jpeg",
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
    email: "arafathossen21233@gmail.com",
};

export const socials = [
    { name: "LinkedIn", href: "https://linkedin.com/in/iamthearafatkhan", icon: "/images/tools/LinkedIn.svg" },
    { name: "GitHub", href: "https://github.com/iamthearafatkhan", icon: "/images/tools/GitHub.svg" },
    { name: "X", href: "https://x.com/iamarafatkhan33", icon: "/images/tools/x.svg" },
    { name: "Facebook", href: "https://facebook.com/iamthearafatkhan", icon: "/images/tools/Facebook.svg" },
    { name: "Email", href: "mailto:arafathossen21233@gmail.com", icon: "/images/tools/gmail.svg" },
];
