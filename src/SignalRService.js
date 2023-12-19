// signalrService.js
 
import { HubConnectionBuilder } from '@microsoft/signalr';
 
class SignalRService {
  constructor() {
   
    this.connection = new HubConnectionBuilder()
      .withUrl('https://csvbatchprocessing20231215182142.azurewebsites.net/progressHub')
      .withAutomaticReconnect()//
      .build();
 
    this.startConnection();
  }
 
  startConnection = async () => {
    try {
      await this.connection.start();
      console.log('SignalR Connected!');
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
    }
  };
 
}
 
 
const signalRService = new SignalRService();
export default signalRService;