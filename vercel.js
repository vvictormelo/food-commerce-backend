{
    "version": 2,
    "builds": [
        {
            "src": "./build/src/index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}