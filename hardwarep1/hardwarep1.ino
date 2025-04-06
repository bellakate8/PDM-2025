/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground through 220 ohm resistor
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button
*/


const int buttonPin = 2;  
const int buttonPin2 = 3;
const int ledPin = 13;   
const int ledPin2 = 12;


int buttonState = 0;  
int buttonState2 = 0;  

int ledState = LOW;  
int ledState2 = LOW;  

int lastButtonState = LOW;  
int lastButtonState2 = LOW; 

unsigned long lastDebounceTime = 0;  
unsigned long debounceDelay = 50;   


unsigned long previousMillis = 0; 


const long interval = 1500;  // interval at which to blink (milliseconds)

void setup() {
  
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
 
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  
  buttonState = digitalRead(buttonPin);

  if (buttonState != lastButtonState) {
    lastDebounceTime = millis();
  }

  if (millis() - lastDebounceTime > debounceDelay) {


  if (buttonState == HIGH) {
    
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
      delay(1000);
    
      previousMillis = currentMillis;

   
      if (ledState == LOW) {
        ledState = HIGH;
      } else {
        ledState = LOW;
      }
    }

    digitalWrite(ledPin, ledState);
  } else {
    // to turn off LED
    digitalWrite(ledPin, LOW);
    previousMillis = 0;
    ledState = LOW;
  }
  }

  lastButtonState = buttonState;




  
  buttonState2 = digitalRead(buttonPin2);

  if (buttonState2 != lastButtonState2) {
    lastDebounceTime = millis();
  }

  if (millis() - lastDebounceTime > debounceDelay) {

  
  if (buttonState2 == HIGH) {
    // to turn on LED:
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
      delay(200);
     
      previousMillis = currentMillis;

   
      if (ledState2 == LOW) {
        ledState2 = HIGH;
      } else {
        ledState2 = LOW;
      }
    }




   
    digitalWrite(ledPin2, ledState2);
  } else {
    // to turn off LED:
    digitalWrite(ledPin2, LOW);
    previousMillis = 0;
    ledState2 = LOW;
  }
  }

  lastButtonState2 = buttonState2;
}