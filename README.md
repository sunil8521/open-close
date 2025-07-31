# Blockchain-Based Issue Management Platform

A decentralized platform for posting and managing Github issues on the blockchain using React frontend and Stacks blockchain technology.

## 📢 Current Status

**What Works Now:**

- ✅ **Post Issues/Bounties** - Create and submit new bounties directly to the blockchain
- ✅ **View Issues/Bounties** - Browse and read all posted bounties from the blockchain
- ✅ **Wallet Connection** - Connect your Leather/Hiro wallet to interact with the platform
- ✅ **Submission Management** - View and manage submissions for bounties
- ✅ **Bounty Resolution** - Approve or reject submissions 

## 🚀 Project Overview

This project allows users to create and manage issues/bounties directly on the blockchain. Currently, the platform supports:

✅ **Implemented Features:**

- Post new bounties/issues on the blockchain
- Connect wallet (Leather/Hiro Wallet)
- Store bounty metadata off-chain (Firebase)
- View bounties (comprehensive listing)
- Submission management system
- Bounty resolution and approval workflow

🔮 **Future Enhancements:**

- Advanced bounty filtering and search
- User reputation and scoring system
- Multi-signature approvals for large bounties
- Mobile application development
- Analytics and reporting dashboard

## 🛠 Tech Stack

### Frontend

- **React** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **React Router** - Client-side routing

### Blockchain

- **Stacks** - Bitcoin layer-2 blockchain
- **Clarity** - Smart contract language
- **Stacks Connect** - Wallet integration
- **Clarinet** - Smart contract development toolkit

### Backend/Storage

- **Firebase** - Off-chain metadata storage
- **Stacks Testnet** - Blockchain network for development

## 📁 Project Structure

```
learn/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── storage/        # Redux store and slices
│   │   └── db/             # Firebase functions
│   └── package.json
├── open-fix/               # Clarinet blockchain project
│   ├── contracts/          # Smart contracts
│   │   └── bounty.clar     # Main bounty contract
│   ├── tests/              # Contract tests
│   └── Clarinet.toml       # Clarinet configuration
└── README.md
```

## 🔧 Smart Contract Features

The `bounty.clar` contract includes:

- **create-bounty**: Post new bounties with reward amount and metadata reference
- **get-bounty**: Retrieve bounty details by ID
- **get-bounty-counter**: Get total number of bounties created

### Contract Functions

```clarity
;; Create a new bounty
(define-public (create-bounty (reward uint) (offchain-ref (string-ascii 100))))

;; Get bounty by ID
(define-read-only (get-bounty (id uint)))

;; Get total bounty count
(define-read-only (get-bounty-counter))
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Clarinet (for blockchain development)
- Leather Wallet or Hiro Wallet browser extension

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sunil8521/open-close.git
   cd open-close/learn
   ```

2. **Install frontend dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install Clarinet (for blockchain development)**

   ```bash
   # On macOS
   brew install clarinet

   # On Linux/Windows (using cargo)
   cargo install clarinet-cli
   ```

### Running the Application

#### Frontend Development Server

1. **Start the React development server**

   ```bash
   cd client
   npm run dev
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Connect your Leather/Hiro wallet when prompted

#### Blockchain Development

1. **Navigate to the blockchain project**

   ```bash
   cd open-fix
   ```

2. **Start Clarinet console (optional)**

   ```bash
   clarinet console
   ```

3. **Run contract tests**

   ```bash
   clarinet test
   ```

4. **Deploy to testnet (when ready)**
   ```bash
   clarinet deploy --testnet
   ```

### Environment Setup

1. **Wallet Setup**

   - Install Leather Wallet or Hiro Wallet browser extension
   - Create a new wallet or import existing one
   - Switch to Stacks Testnet for development

2. **Get Testnet STX**
   - Visit [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet)
   - Request testnet STX tokens for testing

## 🎯 How to Use

### Posting a Bounty

1. **Connect Your Wallet**

   - Click "Connect Wallet" in the navigation
   - Approve the connection in your wallet

2. **Create a New Bounty**

   - Navigate to "Post Bounty" page
   - Fill in the bounty details:
     - Title and description
     - GitHub repository URL
     - Reward amount (in STX)
     - Priority level
     - Submission deadline
   - Click "Post Bounty"
   - Confirm the transaction in your wallet

3. **Transaction Confirmation**
   - Wait for blockchain confirmation
   - Your bounty will be stored on-chain with metadata reference

### Viewing and Managing Bounties

- Navigate to "Bounties" page to see all posted bounties
- Each bounty shows detailed information and blockchain transaction details
- Access submission management for your bounties
- Review, approve, or reject submissions with detailed feedback

## 🔐 Contract Addresses

### Testnet

- **Contract Address**: `ST24PT28CZ0M6PKFWRNMTHVQSF8ZKCFQ6EEBGM2AP`
- **Contract Name**: `bounty`
- **Network**: Stacks Testnet

## 🧪 Testing

### Frontend Tests

```bash
cd client
npm run test
```

### Smart Contract Tests

```bash
cd open-fix
clarinet test
```

## 🚧 Roadmap

- [ ] Advanced search and filtering with multiple criteria
- [ ] User profile system with reputation scoring
- [ ] Analytics dashboard for bounty performance
- [ ] Mobile application for iOS and Android
- [ ] Integration with additional version control systems
- [ ] Multi-signature wallet support for large bounties
- [ ] Automated testing and CI/CD pipeline improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sunil8521/open-close/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

## 🙏 Acknowledgments

- Stacks Foundation for blockchain infrastructure
- Hiro Systems for development tools
- React and Vite communities for frontend tools
- All contributors and testers

---

**Note**: This project is currently in development phase. The bounty posting functionality is fully implemented, while other features like issue resolution and advanced management are still under development.
