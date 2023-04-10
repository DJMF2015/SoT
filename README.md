Source of Truth
===============

This repository is for Source of Truth, a mobile app to act as a single point of reference for  information about AND Somerville.

## Initial Setup:


### Prerequisites

This guide assumes you are setting this up on OSX. You should have homebrew and git installed.


#### Android setup

Follow the [React Native CLI Quickstart setup](https://reactnative.dev/docs/environment-setup) for MacOS with target OS as Android. Ignore the part about setting up a new app, but ensure you've followed the subsequent instructions to create a virtual Android device in Android studio.

The above instructions will have installed the Azul Zulu OpenJDK version of Java 11. You should ensure the JAVA_HOME environment variable points to the Java 11 OpenJDK. The easiest way to manage this is to install jEnv, a tool for managing multiple Java versions:
- install jEnv: 
`brew install jenv`
- add the zulu11 OpenJDK installation directory to the Java versions jEnv knows about. For an x86 mac, this should be: `jenv add /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home`
- `JAVA_HOME` should now point to Java 11 when inside this repo, as it will be picked up from the `.java-version` file. You can check this with `echo $JAVA_HOME`


#### iOS setup

[TODO] 

#### App setup
- Clone this repository, and from within the `source-of-truth` folder, execute `npm install`

#### Contentful setup
- You will need to add some environment variables to a .env file to provide the appropriate Contentful space and API key to the app. Reach out to one of the existing devs for what these should be, otherwise the app will just display a 401 error.

#### App execution
Common development commands are defined as scripts in `package.json`:

- `npm run android` - start the react packager/server and the android simulator
- `npm run ios` - start the react packager/server and the iOS simulator
- `npm run lint` - Run ESLint
- `npm start` - start the react packager/server
- `npm test` - Run the test suite

## Text styling
In order for use to use a custom font on the app we have to use custom components to apply the style to the text

You can find these in `components/Text`. Use these components instead of the default `<Text>` so the text styling is consistent accross the app.

### Adding a new font
If you need to add a new font to the app, add the file in `assets/fonts` and run the command `npx react-native-asset` in the terminal.

### Addind a new text style component
If you need to use a different style of text to the ones already present, create a new component in `components/Text` following the same structure as the other ones and adjusting the styling to your needs.