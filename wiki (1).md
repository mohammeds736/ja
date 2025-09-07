# Project Summary
The Jaafar Al-Sayed Poker project is a modern web application designed to deliver an immersive poker gaming experience. It incorporates biometric authentication, advanced gameplay mechanics, and a rich user interface, allowing players to engage in Texas Hold'em poker with friends or bots. The platform aims to provide a secure and enjoyable environment for both casual and professional players, complete with features like account management, a wallet system for in-game currency, and real-time chat functionalities.

# Project Module Description
- **Authentication System**: User registration and login with biometric and email verification.
- **Main Dashboard**: Interactive dashboard featuring a golden poker table and user statistics.
- **Account Settings**: Manage user profiles, including language preferences and profile pictures.
- **Wallet System**: Buy and sell in-game currency with various payment methods.
- **Game Rooms**: Different skill levels for players to join and compete in poker games.
- **Poker Gameplay**: Implementing Texas Hold'em rules with card distribution and betting systems.
- **Chat System**: Enables communication between players during games.
- **Premium Features**: Options for creating private game rooms and profit-sharing for room owners.

# Directory Tree
```
shadcn-ui/
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── toggle-group.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── index.css
│   ├── lib/
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages/
│   │   ├── AccountSettings.tsx
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── GameRoom.tsx
│   │   ├── Wallet.tsx
│   │   └── NotFound.tsx
│   ├── vite-env.d.ts
│   ├── tailwind.config.ts
│   ├── template_config.json
│   ├── todo.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
```

# File Description Inventory
- **README.md**: Project overview and setup instructions.
- **components.json**: Configuration for UI components.
- **eslint.config.js**: ESLint configuration for code quality.
- **index.html**: Main HTML file for the application.
- **package.json**: Project dependencies and scripts.
- **postcss.config.js**: Configuration for PostCSS.
- **public/**: Static files including favicon and robots.txt.
- **src/**: Source code for the application including components, pages, and styles.

# Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Authentication**: Biometric verification, local storage
- **Build Tools**: Vite, PostCSS, ESLint

# Usage
To get started with the Jaafar Al-Sayed Poker project:
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Run linting checks:
   ```bash
   pnpm run lint
   ```
3. Build the project:
   ```bash
   pnpm run build
   ```
