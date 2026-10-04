// PM2 process file: keeps the website running and restarts it after crashes or a server reboot.
// Start with:  pm2 start deploy/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "uptrix",
      cwd: __dirname + "/..",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      // One copy only: admin login lockouts and page caches live in this process
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "700M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
