/**
 * Categories library
 * This library will contain the mappings to for each service that is correlated to a category
 */

const categories = [
  {
    name: 'AI & Machine Learning',
    services: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Elastic Inference', 'Amazon Forecast', 'Amazon Lex', 'Amazon Personalize', 'Amazon Polly', 'Amazon Rekognition', 'Amazon SageMaker Ground Truth', 'Amazon Textract', 'Amazon Translate', 'Amazon Transcribe', 'AWS Deep Learning AMIs', 'AWS Deep Learning Containers', 'AWS DeepLens', 'AWS DeepRacer', 'Amazon Inferentia', 'Apache MXNet on AWS', 'TensorFlow on AWS', 'AI Hub (beta)', 'Dialogflow', 'Cloud AI building blocks', 'AutoML Tables (beta)', 'Cloud AutoML (beta)', 'Cloud Inference API (alpha)', 'Vision AI', 'Recommendations AI (beta)', 'Video Intelligence', 'AI Platform', 'Cloud Natural Language', 'Cloud TPU', 'Cloud Translation', 'AI Platform Deep Learning VM Image', 'Cloud Text-to-Speech', 'AI Platform Notebooks (beta)', 'Cloud Speech-to-Text', 'Deep Learning Containers', 'Cloud Healthcare Model Explorer', 'Azure Bot Service', 'Azure Databricks', 'Azure Search', 'Bing Autosuggest', 'Bing Custom Search', 'Bing Entity Search', 'Bing Image Search', 'Bing News Search', 'Bing Spell Check', 'Bing Video Search', 'Bing Visual Search', 'Bing Web Search', 'Cognitive Services', 'Computer Vision', 'Content moderator', 'Custom Speech Preview', 'Custom Vision', 'Data Science Virtual Machines', 'Face', 'Azure Machine Learning service', 'Machine Learning Studio', 'Microsoft Genomics', 'Translator Speech', 'Language Understanding', 'Linguistic Analysis', 'Form Recogniser', 'Ink Recogniser', 'Personaliser', 'QnA Maker', 'Speaker Recognition', 'Speech translation', 'Speech-to-Text', 'Text Analytics', 'Text to Speech', 'Translator Text', 'Video Indexer', 'Kinect DK', 'Anomaly detector', 'Azure Open Datasets', 'Immersive Reader', 'Linguistic Analysis Preview']
  },
  {
    name: 'Analytics & Query Services',
    services: ['Amazon Athena', 'Amazon CloudSearch', 'Amazon EMR', 'Amazon Elasticsearch Service', 'Amazon Kinesis', 'Amazon Managed Streaming for Apache Kafka', 'Amazon Redshift' ,'Amazon Quicksight', 'Amazon QuickSight', 'Amazon Data Pipeline', 'AWS Data Pipeline', 'AWS Glue', 'AWS Lake Formation', 'BigQuery', 'Cloud Composer', 'Cloud Dataflow', 'Cloud Data Fusion', 'Cloud Dataproc', 'Data Catalog', 'Cloud Datalab', 'Genomics', 'Cloud Dataprep', 'Google Marketing Platform', 'Cloud Pub/Sub', 'Google Data Studio', 'Firebase Performance Monitoring', 'Azure Databricks', 'Azure Stream Analytics', 'SQL Data Warehouse', 'HDInsight', 'Data Factory', 'Data Lake Analytics', 'Event Hubs', 'Power BI Embedded', 'Azure Analysis Services', 'R Server for HDInsight', 'Data Catalog', 'Azure Data Lake Storage', 'Azure Data Explorer', 'Azure Data Share']
  },
  {
    name: 'Application Integration',
    services: ['AWS Step Functions', 'Amazon MQ', 'Amazon Simple Notification Service (SNS)', 'Amazon Simple Queue Service (SQS)', 'Amazon AppSync']
  },
  {
    name: 'API Management',
    services: ['Apigee API Platform', 'Cloud Endpoints', 'API Analytics', 'Developer Portal', 'API Monetization', 'Apigee healthcare APIx', 'Apigee Hybrid', 'Apigee Open Banking APIx', 'Apigee Sense', 'Cloud Healthcare API']
  },
  {
    name: 'AR & VR',
    services: ['Amazon Sumerian']
  },
  {
    name: 'Blockchain',
    services: ['Amazon Managed Blockchain', 'Amazon Quantum Ledger Database (QLDB', 'Azure Blockchain Service', 'Logic Apps', 'Azure Blockchain Workbench', 'Azure Cosmos DB']
  },
  {
    name: 'Business Applications',
    services: ['Alexa for Business', 'Amazon Chime', 'Amazon WorkMail']
  },
  {
    name: 'Compute',
    services: ['Amazon EC2', 'Amazon EC2 Auto Scaling', 'Amazon Elastic Container Registry', 'Amazon Elastic Container Service', 'Amazon Elastic Container Service for Kubernetes', 'Amazon Elastic Kubernetes Service', 'Amazon Lightsail', 'AWS Batch', 'AWS Elastic Beanstalk', 'AWS Fargate', 'AWS Lambda', 'AWS Outposts', 'AWS Serverless Application Repository', 'VMware Cloud on AWS', 'Compute Engine', 'App Engine', 'Shielded VMs', 'Cloud Run (beta)', 'Google Kubernetes Engine', 'Cloud Functions', 'GKE On-Prem', 'Cloud Functions for Firebase', 'Container security', 'Knative', 'Migrate for Compute Engine', 'Graphics Processing Unit (GPU)', 'Google Kubernetes Engine (GKE)', 'Virtual Machines', 'Azure Kubernetes Service (AKS)', 'Service Fabric', 'App Service', 'Container Instances', 'Batch', 'SQL Server on virtual machines', 'Cloud Services', 'SAP HANA on Azure Large Instances', 'Azure functions', 'Virtual Machine Scale Sets', 'Web Apps', 'Mobile apps', 'API apps', 'Linux Virtual Machines', 'Windows Virtual Desktop', 'Azure CycleCloud', 'Azure VMware Solution by CloudSimple', 'Azure Dedicated Host']
  },
  {
    name: 'Containers',
    services: ['Azure Kubernetes Service (AKS)', 'Service Fabric', 'Container Instances', 'Azure functions', 'Container Registry', 'Web App for Containers', 'Azure Red Hat OpenShift']
  },
  {
    name: 'Cost Management',
    services: ['AWS Cost Explorer', 'AWS Budgets', 'AWS Cost and Usage Report', 'Reserved Instance Reporting']
  },
  {
    name: 'Customer Engagement',
    services: ['Amazon Connect', 'Amazon Pinpoint', 'Amazon Simple Email Service (SES)']
  },
  {
    name: 'Database', 
    services: ['Amazon Aurora', 'Amazon DynamoDB', 'Amazon DocumentDB (with MongoDB compatibility)', 'Amazon ElastiCache', 'Amazon Neptune', 'Amazon Quantum Ledger Database (QLDB)', 'Amazon RDS', 'Amazon RDS on VMware', 'Amazon Redshift', 'Amazon Timestream', 'AWS Database Migration Service', 'Cloud SQL', 'Cloud Memorystore', 'Cloud Bigtable', 'Cloud Firestore', 'Cloud Spanner', 'Firebase Realtime Database', 'SQL Server on virtual machines', 'Azure SQL Database', 'Azure Cosmos DB', 'Azure Cache for Redis', 'SQL Server Stretch Database', 'Table storage', 'Azure Database for PostgreSQL', 'Azure Database for MariaDB', 'Azure Database for MySQL', 'Azure Database Migration Service', 'Azure SQL Database Edge']
  },
  {
    name: 'Developer Tools',
    services: ['AWS CodeStar', 'Amazon Corretto', 'AWS Cloud9', 'AWS CodeBuild', 'AWS CodeCommit', 'AWS CodeDeploy', 'AWS CodePipeline', 'AWS Command Line Interface', 'AWS Tools and SDKs', 'AWS X-Ray', 'Cloud SDK', 'Cloud Tools for Visual Studio', 'Container Registry', 'Cloud Tools for Eclipse', 'Cloud Code', 'Gradle App Engine Plugin', 'Cloud Build', 'Maven App Engine Plugin', 'Cloud Source Repositories', 'Cloud Test Lab', 'Cloud Scheduler', 'Firebase Crashlytics', 'Cloud Tasks', 'Stackdriver Incident Response and Management (alpha)', 'Cloud Code for IntelliJ', 'Tekton', 'Cloud Tools for PowerShell', 'Visual Studio', 'Visual Studio Code', 'SDKs', 'CLIs', 'Azure Lab Services', 'Developer tool integrations', 'App Configuration']
  },
  {
    name: 'DevOps',
    services: ['Azure DevOps', 'Azure Boards', 'Azure Artifacts', 'Azure DevTest Labs', 'Azure Monitor', 'Azure Pipelines', 'Azure Repos', 'Azure Test Plans', 'DevOps tool integrations']
  },
  {
    name: 'End User Computing',
    services: ['Amazon AppStream 2.0', 'Amazon WorkDocs', 'Amazon WorkLink', 'Amazon WorkSpaces']
  },
  {
    name: 'Firebase',
    services: ['Cloud Functions for Firebase', 'Cloud Storage for Firebase', 'Firebase Realtime Database', 'Firebase Performance Monitoring', 'Firebase Crashlytics', 'Firebase Authentication', 'Firebase Predictions']
  },
  {
    name: 'Game Tech',
    services: ['Amazon GameLift', 'Amazon Lumberyard']
  },
  {
    name: 'Gaming',
    services: ['Google Cloud Game Servers (alpha)']
  },
  {
    name: 'Hybrid and multi-cloud',
    services: ['Anthos', 'Kubernetes applications on GCP Marketplace', 'Migrate for Anthos', 'Stackdriver', 'Google Kubernetes Engine', 'Apigee API Management', 'GKE On-Prem', 'Cloud Build', 'Istio on GKE (beta)', 'Traffic Director (beta)', 'Anthos Config Management', 'Serverless', 'Traffic Director']
  },
  {
    name: 'Integration',
    services: ['Event Grid', 'API Management', 'Logic Apps', 'Service Bus']
  },
  {
    name: 'Internet of Things',
    services: ['AWS IoT Core', 'Amazon FreeRTOS', 'AWS Greengrass', 'AWS IoT 1-Click', 'AWS IoT Analytics', 'AWS IoT Button', 'AWS IoT Device Defender', 'AWS IoT Device Management', 'AWS IoT Events', 'AWS IoT SiteWise', 'AWS IoT Things Graph', 'AWS Partner Device Catalog', 'Cloud IoT Core', 'Edge TPU (beta)', 'Azure IoT Hub', 'Azure IoT Central', 'Azure Sphere', 'Azure Maps', 'Event Grid', 'Azure Stream Analytics', 'Notification Hubs', 'Azure IoT Edge', 'Azure IoT solution accelerators', 'Azure Time Series Insights', 'Windows 10 IoT Core Services']
  },
  {
    name: 'Management & Governance',
    services: ['Amazon CloudWatch', 'AWS Auto Scaling', 'AWS CloudFormation', 'AWS CloudTrail', 'AWS Command Line Interface', 'AWS Config', 'AWS Control Tower', 'AWS Console Mobile Application', 'AWS License Manager', 'AWS Management Console', 'AWS Managed Services', 'AWS OpsWorks', 'AWS Organizations', 'AWS Personal Health Dashboard', 'AWS Service Catalog', 'AWS Systems Manager', 'AWS Trusted Advisor', 'AWS Well-Architected Tool', 'Amazon Cloud Directory', 'Stackdriver', 'Transparent Service Level Indicators', 'Monitoring', 'Cloud Deployment Manager', 'Service Monitoring (alpha)', 'Cloud Console', 'Logging', 'Cloud Shell', 'Error Reporting', 'Cloud Mobile App', 'Trace', 'Cost management', 'Debugger', 'Cloud APIs', 'Profiler', 'Orbitera White-Label Marketplace', 'Private Catalog (beta)', 'Google Cloud Service Mesh', 'Azure Backup', 'Azure Advisor', 'Automation', 'Azure Monitor', 'Azure Service Health', 'Azure Resource Manager', 'Azure mobile app', 'Cost management', 'Azure Migrate', 'Azure Lighthouse', 'Azure Site Recovery', 'Scheduler', 'Traffic Manager', 'Network Watcher', 'Microsoft Azure portal', 'Cloud Shell', 'Azure Policy', 'Azure Managed Applications', 'Azure Blueprints']
  },
  {
    name: 'Marketing Management',
    services: ['Google Data Studio*', 'Google Marketing Platform*']
  },
  {
    name: 'Media Services',
    services: ['Amazon Elastic Transcoder', 'Amazon Kinesis Video Streams', 'AWS Elemental MediaConnect', 'AWS Elemental MediaConvert', 'AWS Elemental MediaLive', 'AWS Elemental MediaPackage', 'AWS Elemental MediaStore', 'AWS Elemental MediaTailor', 'AWS Elemental Appliances & Software', 'Anvato', 'Zync Render', 'Encoding', 'Azure Media Player', 'Media Analytics', 'Media Services', 'Live and On-Demand Streaming', 'Content Protection', 'Video Indexer']
  },
  {
    name: 'Microsoft Azure Stack',
    services: ['Azure Stack']
  },
  {
    name: 'Miscellaneous Softwares & Products',
    services: ['Chrome Browser', 'Chrome OS and Chromebooks']
  },
  {
    name: 'Migration & Transfer',
    services: ['AWS Migration Hub', 'AWS Application Discovery Service', 'AWS Database Migration Service', 'AWS DataSync', 'AWS Server Migration Service', 'AWS Snow Family', 'AWS Transfer for SFTP', 'CloudEndure Migration', 'Cloud Data Transfer', 'BigQuery Data Transfer Service', 'Cloud Foundation Toolkit', 'Migrate for Anthos', 'Transfer Appliance', 'Migrate for Compute Engine', 'Cloud Storage Transfer Service', 'VM Migration', 'Azure Site Recovery', 'Azure Database Migration Service', 'Data Box', 'Azure Migrate']
  },
  {
    name: 'Mixed Reality',
    services: ['Azure Digital Twins', 'Kinect DK', 'Spatial anchors', 'Remote rendering']
  },
  {
    name: 'Mobile',
    services: ['AWS Amplify', 'Amazon API Gateway', 'Amazon Pinpoint', 'AWS AppSync', 'AWS Device Farm', 'App Service', 'Visual Studio App Centre', 'Mobile apps', 'Azure mobile app', 'Xamarin']
  },
  {
    name: 'Navigation',
    services: ['Maps', 'Routes', 'Places', 'Ridesharing', 'Gaming', 'Asset tracking']
  },
  {
    name: 'Networking & Content Delivery (CDN)',
    services: ['Amazon VPC', 'Amazon API Gateway', 'Amazon CloudFront', 'Amazon Route 53', 'AWS PrivateLink', 'AWS App Mesh', 'AWS Cloud Map', 'AWS Direct Connect', 'AWS Global Accelerator', 'AWS Transit Gateway', 'Elastic Load Balancing', 'Virtual Private Cloud (VPC)', 'Hybrid Connectivity', 'Cloud Load Balancing', 'Cloud DNS', 'Cloud Armor', 'Network Service Tiers', 'Cloud CDN', 'Network Telemetry', 'Cloud NAT', 'Traffic Director (beta)', 'Content Delivery Network', 'Azure DNS', 'Traffic Manager', 'VPN Gateway', 'Azure DDoS Protection', 'Azure Firewall', 'Azure Front Door', 'ExpressRoute', 'Virtual Network', 'Load Balancer', 'Application Gateway', 'Network Watcher', 'Virtual WAN', 'Azure Bastion']
  },
  {
    name: 'Robotics',
    services: ['AWS RoboMaker']
  },
  {
    name: 'Satellite',
    services: ['AWS Ground Station']
  },
  {
    name: 'Security, Identity & Compliance',
    services: ['AWS Identity & Access Management', 'Amazon Cloud Delivery', 'Amazon Cognito', 'Amazon GuardDuty', 'Amazon Inspector', 'Amazon Macie', 'AWS Artifact', 'AWS Certificate Manager', 'AWS CloudHSM', 'AWS Directory Service', 'AWS Firewall Manager', 'AWS Key Management Service', 'AWS Resource Access Manager', 'AWS Secrets Manager', 'AWS Security Hub', 'AWS Shield', 'AWS Single Sign-On (SSO)', 'AWS Single Sign-On', 'AWS WAF', 'Access Transparency', 'Cloud Security Scanner', 'Binary Authorization', 'Context-aware access (beta)', 'Cloud Audit Logs', 'Event Threat Detection (beta)', 'Cloud IAM', 'Managed Service for Microsoft Active Directory (alpha)', 'Cloud Identity', 'Policy Intelligence (alpha)', 'Identity Platform', 'Resource Manager', 'Cloud Identity-Aware Proxy', 'Security key enforcement', 'Cloud Data Loss Prevention', 'Titan Security Key', 'Cloud HSM', 'VPC Service Controls', 'Cloud Key Management Service', 'Cloud Security Command Center', 'Context-aware access', 'Azure Active Directory', 'Azure Active Directory Domain Services', 'Azure Information Protection', 'Azure Active Directory B2C', 'Security Center', 'VPN Gateway', 'Azure DDoS Protection', 'Azure Information Protection', 'Key Vault', 'Azure Dedicated HSM', 'Application Gateway', 'Azure Sentinel']
  },
  {
    name: 'Storage', 
    services: ['Amazon Simple Storage Service (S3)', 'Amazon Elastic Block Store (EBS)', 'Amazon Elastic File System (EFS)', 'Amazon FSx for Lustre', 'Amazon FSx for Windows File Server', 'Amazon S3 Glacier', 'AWS Backup', 'AWS Snow Family', 'AWS Storage Gateway', 'Cloud Storage', 'Cloud Filestore', 'Persistent Disk', 'Drive Enterprise', 'Cloud Storage for Firebase', 'Storage Accounts', 'StorSimple', 'Blob Storage', 'Managed Disks', 'File storage', 'Avere vFXT for Azure', 'Archive Storage', 'Azure NetApp Files', 'Azure Backup', 'Azure Data Lake Storage', 'Disk storage', 'Queue Storage', 'Data Box', 'Azure FXT Edge Filer', 'Storage Explorer', 'Azure Data Share']
  },
  {
    name: 'Web',
    services: ['App Service', 'Web Apps', 'API apps', 'Azure SignalR Service', 'Azure Maps', 'Azure Search', 'Web App for Containers']
  },
  {
    name: 'Windows Virtual Desktop',
    services: ['Windows Virtual Desktop']
  },
  {
    name: 'Workforce Tools',
    services: ['Gmail', 'Calendar', 'Drive', 'Google+', 'Hangouts Chat', 'Hangouts Meet', 'Cloud Search', 'Docs', 'Sheets', 'Slides', 'Forms', 'Sites', 'App Maker', 'Keep', 'Hangouts Meet Hardware', 'Hire by Google', 'Jamboard', 'Drive Enterprise', 'Google Voice']
  }
]

module.exports = categories