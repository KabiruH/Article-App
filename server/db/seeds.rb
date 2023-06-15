# USERS
user1 = User.create(username: 'jamnjeri', email: 'jamnjeri@gmail.com', password: 'jamnjeri@123', role: 2)
user2 = User.create(username: 'kahingaK', email: 'ikahinga@gmail.com', password: 'password', role: 2)
user3 = User.create(username: 'hawa', email: 'hawachege@gmail.com', password: 'password', role: 1)
user4 = User.create(username: 'daisy', email: 'idaisya@gmail.com', password: 'password', role: 0)

cat1 = Category.create!(
  name: "Data science",
  description: " includes technologies that involve the extraction, analysis, and interpretation of data to gain insights and inform decision-making, such as data mining, machine learning, statistical modeling, and big data analytics."
)
cat2= Category.create!(
  name: "Software engineering",
  description: "includes technologies that involve the design, development, and maintenance of software systems and applications, such as programming languages, software development methodologies, and software testing frameworks."
)
cat3= Category.create!(
  name: "Robotics",
  description: " includes technologies that enable machines to perform tasks that typically require human interaction, such as assembly line work, exploration, and surgery."
)
cat4= Category.create!(
  name: "Hardware",
  description: "Includes the physical components of a computer, such as the motherboard, processor, memory, storage devices, and input/output devices."
)
cat5 = Category.create!(
  name: "Networking",
  description: "includes technologies that enable computers and other devices to communicate with each other, such as Wi-Fi, Ethernet, Bluetooth, and cellular networks."
)
cat6 = Category.create!(
  name: "Cybersecurity",
  description: " includes technologies that protect computer systems and data from unauthorized access, such as firewalls, antivirus software, and encryption."
)
cat7 = Category.create!(
  name: "Artificial intelligence (AI)",
  description: "Includes technologies that enable computers to perform tasks that typically require human intelligence, such as image and speech recognition, natural language processing, and decision-making."
)
cat8 = Category.create!(
  name: "Cloud computing",
  description: "Includes technologies that enable users to access computing resources, such as storage, processing power, and applications, over the internet, rather than from a local computer"
)
cat9 = Category.create!(
  name: "Quantum computing",
  description: "includes technologies that use quantum-mechanical phenomena to perform calculations and solve problems that are beyond the capabilities of classical computers."
)


  # 10.times do
  #   User.create!(
  #     username: Faker::Name.name,
  #     email: Faker::Internet.email,
  #     password: 'password', # Set password directly to 'password'
  #     role: 0
  #   )
  # end


