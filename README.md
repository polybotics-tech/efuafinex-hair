# Welcome to Efuafinix Hair Mobile App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Project Structure

The project is structured as follows:

```
/efuafinix_hair_app
├── app
│   ├── (auth)
│   ├── (main)
│   ├── (tabs)
│   ├── _layout.jsx_
│   ├── index.jsx
│   └── ...
├── assets/
├── components/
├── constants/
├── helpers/
├── redux/
├── node_modules
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

- **/assets**: Contains images, fonts, and other static assets.
- **/components**: Contains reusable components used throughout the app.
- **/constants**: Contains the different constants/themes of the app.
- **/helpers**: Contains the helping functions/utilities for the app.
- **/redux**: Contains the redux global state management files

## Scripts

In the project directory, you can run:

- `npm start`: Starts the development server.
- `npm run android`: Builds the app for Android.
- `npm run ios`: Builds the app for iOS.
- `npm run web`: Starts the web version of the app.
- `npm run eject`: Ejects the app from Expo, giving you full control over the native code.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
