
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Code snippets that will float in the background
const codeSnippets = [
  "const hackGame = () => { return 'victory'; }",
  "function bypassAnticheat() { /* stealth code */ }",
  "class AimbotController { constructor() { this.accuracy = 100; } }",
  "import { WallHack } from './cheats';",
  "const players = game.getVisibleEnemies();",
  "if(enemy.isVisible() && !enemy.isTeammate()) { autoAim(); }",
  "export default class EspHack extends BaseHack { }",
  "const config = { silent: true, undetectable: true };",
  "addEventListener('enemySpotted', handleAutoFire);",
  "private void MemoryPatch(IntPtr address) { }",
  "float CalculateDistance(Vector3 playerPos, Vector3 enemyPos);",
  "void InjectDLL(Process gameProcess) { }",
  "const triggerBot = new TriggerBot({ delayMs: 10 });",
  "bool IsPointVisible(Vector3 start, Vector3 end);",
  "for(const entity of world.entities) { if(entity.isEnemy) { } }",
  "socket.on('gameData', handleGameData);",
  "const recoilValues = [0.1, 0.2, 0.15, 0.05];"
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Create floating code snippets
    const codeBackground = document.createElement('div');
    codeBackground.className = 'code-background';
    
    const codeLines = document.createElement('div');
    codeLines.className = 'code-lines';
    codeBackground.appendChild(codeLines);
    
    // Create and position random code snippets
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const snippet = document.createElement('div');
        snippet.className = 'code-snippet';
        snippet.style.left = `${Math.random() * 100}vw`;
        snippet.style.animationDelay = `${Math.random() * 20}s`;
        snippet.style.animationDuration = `${15 + Math.random() * 30}s`;
        snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeBackground.appendChild(snippet);
      }, i * 1000);
    }
    
    document.body.appendChild(codeBackground);
    
    // Cleanup function
    return () => {
      document.body.removeChild(codeBackground);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
