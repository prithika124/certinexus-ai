// CertiNexus AI Synthetic Dataset - Enhanced for hackathon
const CertiNexusData = {
  // Global Workforce Analytics
  workforce: {
    overview: {
      employees: 48,
      activeLearners: 31,
      ready: 14,
      certified: 9
    },
    pipeline: {
      learning: 18,
      assessment: 10,
      ready: 8,
      certified: 5
    },
    risk: {
      high: 5,
      medium: 12,
      low: 31
    },
    skillsHeatmap: {
      "Storage": 60,
      "Monitoring": 74,
      "Azure Functions": 80,
      "Security": 68,
      "DevOps": 55,
      "API Management": 70
    }
  },

  employees: {
    "EMP-001": {
      id: "EMP-001",
      name: "Prithi J (You)",
      role: "Cloud Engineer",
      team: "Team Alpha",
      certification: "AZ-204",
      certName: "Developing Solutions for Microsoft Azure",
      experience: "Beginner",
      progress: 68,
      readinessScore: 78, 
      passProbability: 78, // Preserved Readiness Probability: 78%
      expectedDays: 12,    // Preserved Expected Completion: 12 Days
      confidenceLevel: "High", // Preserved Confidence: High
      meetingHours: 20,
      focusHours: 15,
      targetExamDays: 30,
      weeklyStudyHours: 12,
      totalStudyHours: 45, // Enhanced Profile stats
      completedPaths: 2,   // Enhanced Profile stats
      competencies: {
        "Azure Functions": 80,
        "Azure Storage": 60,
        "APIs & Security": 70,
        "Monitoring & Optim.": 74
      },
      confidence: {
        "Azure Functions": "High",
        "Azure Storage": "Low",
        "APIs & Security": "Medium",
        "Monitoring & Optim.": "Medium"
      },
      completedModules: [
        "Azure App Service Web Apps",
        "Azure Functions core features",
        "Cosmos DB connection pools"
      ],
      skillGaps: [
        "Azure Storage Optimization",
        "API Management policies",
        "Application Insights alerts"
      ],
      milestones: [
        { name: "Azure Functions Module", status: "completed", date: "June 2" },
        { name: "Storage Optimization Module", status: "in-progress", date: "June 10" },
        { name: "API Management Setup", status: "upcoming", date: "June 15" },
        { name: "Practice Assessment", status: "upcoming", date: "June 25" }
      ],
      aiRecommendations: [
        "Focus on Azure Storage this week. It is currently your lowest-scoring competency (60%).",
        "Schedule adjusted because your meeting load (20 hours) exceeded recommended focus thresholds."
      ],
      avatar: "PJ",
      achievements: [
        { name: "App Service Explorer", desc: "Completed all Azure App Service deployment and diagnostic labs.", icon: "🎖️" },
        { name: "C# Web Master", desc: "Demonstrated master-level integration of Azure SDK tools in local environments.", icon: "💻" },
        { name: "7-Day Study Streak", desc: "Maintained active study sessions for 7 consecutive days.", icon: "🔥" }
      ],
      history: [
        { week: "Wk 21", score: 62, hours: 8 },
        { week: "Wk 22", score: 66, hours: 10 },
        { week: "Wk 23", score: 72, hours: 12 },
        { week: "Wk 24", score: 78, hours: 15 }
      ],
      assessmentHistory: [
        { date: "May 15", score: 60, quiz: "Storage & Cosmos DB Basics" },
        { date: "May 22", score: 68, quiz: "Compute Services & Functions" },
        { date: "June 1", score: 72, quiz: "APIM Gateway Routing Config" },
        { date: "June 8", score: 78, quiz: "Diagnostic Logging & App Insights" }
      ]
    },
    "EMP-002": {
      id: "EMP-002",
      name: "Sarah Jenkins",
      role: "DevOps Engineer",
      team: "Team Alpha",
      certification: "AZ-400",
      certName: "Designing & Implementing DevOps Solutions",
      experience: "Intermediate",
      progress: 45,
      readinessScore: 72,
      passProbability: 68,
      expectedDays: 25,
      confidenceLevel: "Medium",
      meetingHours: 25,
      focusHours: 10,
      targetExamDays: 45,
      weeklyStudyHours: 6,
      totalStudyHours: 28,
      completedPaths: 1,
      competencies: {
        "CI/CD Pipelines": 65,
        "Infrastructure as Code": 50,
        "Instrumentation": 60,
        "Security & Compliance": 55
      },
      confidence: {
        "CI/CD Pipelines": "Medium",
        "Infrastructure as Code": "Low",
        "Instrumentation": "Medium",
        "Security & Compliance": "Low"
      },
      completedModules: [
        "Introduction to Azure Pipelines",
        "Git Branching Strategies"
      ],
      skillGaps: [
        "GitHub Actions custom runners",
        "Terraform state management",
        "Azure Key Vault secrets"
      ],
      milestones: [
        { name: "Pipelines & Releases", status: "completed", date: "May 28" },
        { name: "Infrastructure as Code", status: "in-progress", date: "June 12" },
        { name: "Instrumentation setup", status: "upcoming", date: "June 20" }
      ],
      aiRecommendations: [
        "Alert: Focus hours are extremely low (10h) due to high meetings (25h). Consider blocking out focus time.",
        "Deep dive into Terraform state management to raise IaC scores."
      ],
      avatar: "SJ",
      achievements: [
        { name: "Pipeline Pioneer", desc: "Authored multi-stage YAML builds with automated testing.", icon: "⚙️" }
      ],
      history: [
        { week: "Wk 21", score: 50, hours: 4 },
        { week: "Wk 22", score: 55, hours: 5 },
        { week: "Wk 23", score: 62, hours: 6 },
        { week: "Wk 24", score: 72, hours: 6 }
      ],
      assessmentHistory: [
        { date: "May 20", score: 50, quiz: "YAML Pipeline Setup" },
        { date: "June 2", score: 62, quiz: "IaC & Terraform Basics" }
      ]
    },
    "EMP-003": {
      id: "EMP-003",
      name: "Alex Rivera",
      role: "Data Engineer",
      team: "Team Beta",
      certification: "DP-203",
      certName: "Data Engineering on Microsoft Azure",
      experience: "Advanced",
      progress: 85,
      readinessScore: 84,
      passProbability: 92,
      expectedDays: 5,
      confidenceLevel: "High",
      meetingHours: 10,
      focusHours: 25,
      targetExamDays: 10,
      weeklyStudyHours: 22,
      totalStudyHours: 88,
      completedPaths: 4,
      competencies: {
        "Azure Synapse Analytics": 90,
        "Azure Databricks": 86,
        "Data Lake Storage": 92,
        "Monitoring & Security": 84
      },
      confidence: {
        "Azure Synapse Analytics": "High",
        "Azure Databricks": "High",
        "Data Lake Storage": "High",
        "Monitoring & Security": "Medium"
      },
      completedModules: [
        "Synapse Spark Pools",
        "Delta Lake Design",
        "Data Factory Orchestration"
      ],
      skillGaps: [
        "Databricks cluster sizing",
        "Row-level security in Synapse"
      ],
      milestones: [
        { name: "Practice Exam 2", status: "completed", date: "May 30" },
        { name: "Data Factory Pipelines", status: "completed", date: "June 4" },
        { name: "Final Mock Review", status: "in-progress", date: "June 9" }
      ],
      aiRecommendations: [
        "You are ready for the exam. Ensure final review of databricks auto-scaling settings.",
        "Take final practice assessment to secure your 84% readiness rating."
      ],
      avatar: "AR",
      achievements: [
        { name: "Databricks Guru", desc: "Configured optimized autoscale clusters with Delta Lakes.", icon: "⚡" },
        { name: "ETL Master", desc: "Completed Synapse and Data Factory deep data pipeline architectures.", icon: "🔀" }
      ],
      history: [
        { week: "Wk 21", score: 70, hours: 15 },
        { week: "Wk 22", score: 75, hours: 18 },
        { week: "Wk 23", score: 80, hours: 20 },
        { week: "Wk 24", score: 84, hours: 22 }
      ],
      assessmentHistory: [
        { date: "May 18", score: 72, quiz: "Data Lake Partitioning" },
        { date: "June 1", score: 84, quiz: "Synapse SQL Analytics Pools" }
      ]
    },
    "EMP-007": {
      id: "EMP-007",
      name: "Liam Chen",
      role: "Security Analyst",
      team: "Team Gamma",
      certification: "AZ-500",
      certName: "Microsoft Azure Security Technologies",
      experience: "Intermediate",
      progress: 58,
      readinessScore: 76,
      passProbability: 72,
      expectedDays: 18,
      confidenceLevel: "Medium",
      meetingHours: 15,
      focusHours: 18,
      targetExamDays: 40,
      weeklyStudyHours: 10,
      totalStudyHours: 36,
      completedPaths: 2,
      competencies: {
        "Identity & Access": 80,
        "Platform Protection": 74,
        "Security Operations": 78,
        "Data & Applications": 72
      },
      confidence: {
        "Identity & Access": "High",
        "Platform Protection": "Medium",
        "Security Operations": "High",
        "Data & Applications": "Medium"
      },
      completedModules: [
        "Azure Active Directory config",
        "Managed Identities setup",
        "Network Security Groups routing"
      ],
      skillGaps: [
        "Sentinel Log Analytics queries",
        "Database encryption key rotation rules"
      ],
      milestones: [
        { name: "Identity Operations", status: "completed", date: "May 25" },
        { name: "Platform Security", status: "completed", date: "June 2" },
        { name: "Database Protection", status: "in-progress", date: "June 14" }
      ],
      aiRecommendations: [
        "Review Sentinel Workbook configurations to raise platform protection levels."
      ],
      avatar: "LC",
      achievements: [
        { name: "Identity Guard", desc: "Configured complex PIM and MFA conditional policies.", icon: "🛡️" }
      ],
      history: [
        { week: "Wk 21", score: 60, hours: 8 },
        { week: "Wk 22", score: 65, hours: 10 },
        { week: "Wk 23", score: 70, hours: 10 },
        { week: "Wk 24", score: 76, hours: 10 }
      ],
      assessmentHistory: [
        { date: "May 20", score: 65, quiz: "Identity Operations" },
        { date: "June 5", score: 76, quiz: "Network Platform Guarding" }
      ]
    }
  },

  teams: {
    "Team Alpha": {
      name: "Cloud & DevOps Team",
      avgReadiness: 82, 
      totalCertifications: 5,
      targetCerts: ["AZ-204", "AZ-400"],
      members: ["EMP-001", "EMP-002"],
      riskCount: 0,
      improvingCount: 2,
      readyCount: 1,
      skillDeficiencies: ["Azure Storage Optimization", "Terraform state management", "API Management policies"]
    },
    "Team Beta": {
      name: "Data Analytics Team",
      avgReadiness: 74, 
      totalCertifications: 2,
      targetCerts: ["DP-203", "AZ-204"],
      members: ["EMP-003"],
      riskCount: 0,
      improvingCount: 1,
      readyCount: 1,
      skillDeficiencies: ["Databricks cluster sizing", "Cosmos DB indexing configurations", "Row-level security in Synapse"]
    },
    "Team Gamma": {
      name: "Cybersecurity & Governance",
      avgReadiness: 67, 
      totalCertifications: 1,
      targetCerts: ["AZ-500", "DP-203"],
      members: ["EMP-007"],
      riskCount: 1,
      improvingCount: 1,
      readyCount: 0,
      skillDeficiencies: ["Spark performance tuning", "Sentinel Log Analytics queries", "Synapse SQL Pools partitioning"]
    },
    "Team Delta": {
      name: "Cloud Architecture Team",
      avgReadiness: 88,
      totalCertifications: 8,
      targetCerts: ["AZ-305", "AI-102"],
      members: ["EMP-001", "EMP-003"], // Synthesized members for demonstration
      riskCount: 0,
      improvingCount: 1,
      readyCount: 2,
      skillDeficiencies: ["Azure Solutions Design", "Cognitive Services integration", "Vector search configuration"]
    }
  },

  questionBank: {
    "AZ-204": [
      {
        id: "q-204-1",
        competency: "Azure Functions",
        question: "You need to implement an Azure Function that processes incoming messages from an Azure Service Bus queue. The function must scale automatically based on queue length and must support connection strings stored in Azure Key Vault without exposing secrets in code. Which configuration and hosting plan should you choose?",
        options: [
          "Consumption plan + Managed Identity + App Settings referencing Key Vault secrets using '@Microsoft.KeyVault' syntax.",
          "Premium plan + Service Principal secret stored in local.settings.json + Functions triggers in Premium scale.",
          "Dedicated (App Service) plan + Basic tier + Connection string hardcoded in host.json.",
          "Consumption plan + Standard Key Vault reference + Basic Authentication on Service Bus Queue."
        ],
        correctIndex: 0,
        explanation: "Using the Consumption plan allows automatic scaling. To reference Key Vault without secrets in code, you should configure Managed Identity for the Azure Function app, grant it access to the Key Vault, and configure App Settings referencing the Key Vault using the '@Microsoft.KeyVault' reference syntax."
      },
      {
        id: "q-204-2",
        competency: "Azure Storage",
        question: "Your application needs to store highly confidential document attachments. The documents must be encrypted using customer-managed keys (CMK) stored in an Azure Key Vault, and access must be restricted using time-bound shared access signatures (SAS). Which storage tier and encryption setup should you configure?",
        options: [
          "Azure Blob Storage (Hot/Cool) + Enable Infrastructure Encryption + Customer-Managed Keys (CMK) configured on Storage Account + Stored Access Policies for SAS generation.",
          "Azure File Shares + Default Microsoft-managed keys + Ad-hoc SAS tokens with 1-year expiry.",
          "Azure Queue Storage + Double Encryption + Shared Key access.",
          "Azure Blob Storage (Archive) + Public Access + SAS tokens generated via SAS-token API."
        ],
        correctIndex: 0,
        explanation: "Azure Blob Storage with Customer-Managed Keys (CMK) allows storing and encrypting blobs using your own keys. Stored Access Policies are critical for SAS tokens to allow revocation and enforce time-bound properties."
      },
      {
        id: "q-204-3",
        competency: "APIs & Security",
        question: "An API Management (APIM) gateway needs to enforce a rate limit of 100 calls per minute per client IP address. If a client exceeds this limit, the gateway should return a 429 Too Many Requests status code with a custom header. What should you configure in the APIM policy?",
        options: [
          "Add the <rate-limit-by-key> policy inside the <inbound> block, setting calls=\"100\" duration=\"60\" counter-key=\"@(context.Request.IpAddress)\".",
          "Create a policy with <quota-by-key> in the <outbound> section with customized client headers.",
          "Use Azure Front Door to throttle IP addresses, passing the status code back to APIM.",
          "Increase the VM tier of the APIM instance to Premium and enable auto-scaling to prevent overloading."
        ],
        correctIndex: 0,
        explanation: "The <rate-limit-by-key> policy in the inbound processing block throttles requests on a per-key basis (such as IP address: context.Request.IpAddress) for a given duration (60 seconds) and limit (100 calls)."
      }
    ],
    "AZ-400": [
      {
        id: "q-400-1",
        competency: "Infrastructure as Code",
        question: "You are designing a Terraform deployment pipeline in Azure DevOps. Multiple release agents will run parallel deployments, modifying the same set of Azure resources. How should you configure state locking and remote backend storage to prevent deployment conflicts?",
        options: [
          "Use an Azure Storage Account container with Blob leases, configured as a Terraform remote 'azurerm' backend.",
          "Store the terraform.tfstate file inside the Azure DevOps Git repository and run auto-merge on pull requests.",
          "Store the state locally on the build agent and copy it to a Shared File Share at the end of each run.",
          "Use Azure SQL Database with Row-Level Locking enabled to store the Terraform state."
        ],
        correctIndex: 0,
        explanation: "The 'azurerm' backend for Terraform supports state storage in an Azure Blob container and uses Azure blob leases to automatically handle state locking during operations, preventing concurrent modifications."
      }
    ],
    "DP-203": [
      {
        id: "q-203-1",
        competency: "Azure Synapse Analytics",
        question: "You have an enterprise data warehouse in Azure Synapse Analytics containing a table with 500 million rows. Users run frequent aggregations on a column named StoreID, filtering by TransactionDate. Which distribution type and indexing strategy will provide the best query performance?",
        options: [
          "Hash distribution on StoreID + Clustered Columnstore Index + Partitioned by TransactionDate (monthly).",
          "Replicated distribution + Heap index + Partitioned by StoreID.",
          "Round-robin distribution + Non-clustered index on StoreID + No partitioning.",
          "Hash distribution on TransactionDate + Heap index + Partitioned by StoreID."
        ],
        correctIndex: 0,
        explanation: "Hash distribution on high-cardinality columns (StoreID) distributes rows evenly across query engines. Clustered Columnstore indexing provides optimal performance for aggregation queries on large datasets. Partitioning by TransactionDate speeds up time-filtered queries."
      }
    ]
  },

  knowledgeBase: [
    {
      title: "Azure Functions Developer Guide",
      category: "Certification Guides",
      tags: ["AZ-204", "Compute"],
      content: "This guide covers how to build, deploy, and configure Azure Functions. Learn about triggers (Http, Service Bus, Blob), bindings, hosting plans (Consumption, Premium, App Service), and scaling behavior. Pay close attention to scale controller operations for the AZ-204 exam."
    },
    {
      title: "Azure Key Vault Reference Integration",
      category: "Study Resources",
      tags: ["AZ-204", "Security"],
      content: "Learn to fetch secrets in Azure App Services and Azure Functions without hardcoding connection strings. Understand how to use System-Assigned Managed Identity, Key Vault Access Policies, and App Service configuration syntax `@Microsoft.KeyVault(SecretUri=...)`."
    },
    {
      title: "Terraform State Management Best Practices",
      category: "Study Resources",
      tags: ["AZ-400", "DevOps"],
      content: "Deep dive into Terraform Remote Backends. Configured backend storage in Azure Blob Containers using Storage Account locks. Learn how locks protect configuration drift and avoid parallel execution collision in pipeline runners."
    },
    {
      title: "Synapse Dedicated SQL Pools Distribution Models",
      category: "Learning Documents",
      tags: ["DP-203", "Data Engineering"],
      content: "Detailed breakdown of Hash-Distributed, Replicated, and Round-Robin tables. Hash-distribution is optimal for join-heavy large tables. Replicated is ideal for smaller dimension tables to avoid data shuffling. Round-robin is best for staging tables."
    },
    {
      title: "What skills are required for AZ-204?",
      category: "AI Knowledge Search",
      tags: ["AZ-204", "Skills"],
      content: "For AZ-204 (Developing Solutions for Microsoft Azure), the required skills are: 1. Develop Azure compute solutions (Azure Functions, App Services, Containers) 2. Develop for Azure storage (Cosmos DB, Blob storage) 3. Implement Azure security (OAuth2, Key Vault, Managed Identities) 4. Monitor, troubleshoot, and optimize Azure solutions (App Insights, Cache)."
    },
    {
      title: "What is the recommended study path for DP-203?",
      category: "AI Knowledge Search",
      tags: ["DP-203", "Study Path"],
      content: "For DP-203 (Data Engineering on Microsoft Azure), the recommended study path is: Week 1: Batch processing & storage (Data Lake Gen2, Delta Lake format) | Week 2: Synapse Dedicated SQL Pools (Hash/Replicated distribution, partitioning) | Week 3: Azure Databricks Spark tuning (cluster sizing, auto-scale) | Week 4: Row-level security & database token encryption."
    },
    {
      title: "AI-102: Designing and Implementing an Azure AI Solution",
      category: "Certification Guides",
      tags: ["AI-102", "AI"],
      content: "Covers Azure Cognitive Services, Azure OpenAI Service, AI Search, Language Service, Speech, and Computer Vision. Study how to configure private endpoints and manage keys securely."
    },
    {
      title: "AZ-305: Designing Microsoft Azure Infrastructure Solutions",
      category: "Certification Guides",
      tags: ["AZ-305", "Architecture"],
      content: "Covers design for identity, governance, monitoring, data storage, business continuity, and infrastructure design. Important topics: SQL elastic pools, Storage replication options (LRS/GRS/ZRS), and landing zone guidelines."
    }
  ]
};

// Export to window object for browser access
window.CertiNexusData = CertiNexusData;
