# Radio and Linear selector

## Description
Simple and fancy floating selector to give that special touch to your projects.

Currently there are two types of selector deployers:

* **Radio Selector**
* **Linear Selector**

## Initialization
Both of them accept the same arguments:

* **DOMElement** of the main button to use (must be the first item in the list)
* **Object** with the configuration:
  * **minimumItems**: Minimum items the list must have to arrange items freely (checkout the examples to get a better overview)
  * **startingAngle**: Angle at which the selector will start displaying elements


It is structured as npm dependency, so it is easy to include in your own project. Nevertheless, if you want to use it as an independent script, just pack it up using  ```npm run build``` and therefore, you will be able to use it by calling **window.fancySelector**.

### Examples of initialization

#### Radio selector

* Simple radio selector: 

```
        fancySelector.createRadioSelector( mainButton );

```
* Radio selector starting from an specific angle

```
        fancySelector.createRadioSelector( mainButton, {
            startingAngle: fancySelector.RADS_90
        });
```
* Radio selector using the minimum of items to arrange them in just 90 degrees.

```
        fancySelector.createRadioSelector( mainButton, {
            minimumItems: 3
        });
```

#### Linear selector


* Simple linear selector: 

```
        fancySelector.createLinearSelector( mainButton );

```
* Linear selector starting from an specific angle

```
        fancySelector.createLinearSelector( mainButton, {
            startingAngle: fancySelector.RADS_90
        });
```


## Try it by yourself
Do as follows: 

* Run "npm install"
* Run "npm run build" to compile the module.
