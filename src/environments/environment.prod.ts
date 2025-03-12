export const environment = {
  production: true,
  backendUri: 'https://devops-attendance-app-func.azurewebsites.net/api/',
  msal: {
    clientId: '1d5d790f-f1c2-41bc-80df-e57e3642b219',
    authority: 'https://login.microsoftonline.com/4d6aeeaa-63b4-4dd7-90c7-28ddde1daea4',
    redirectUri: 'https://attendance.sueniversity.nl',
  },
  appInsights: {
    instrumentationKey: 'd0e978bf-a8f7-4e85-9a7d-05fc97e3b1dd'
  }
};
