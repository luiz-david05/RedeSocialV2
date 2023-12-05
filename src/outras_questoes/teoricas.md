1. Podemos instanciar classes abstratas? Justifique.
<br>
```
É um tipo especial de classe que não pode ser instanciada, porque a ideia por trás de uma classe abstrata 
é que ela seja herdada e instanciada em outras classes, é um tipo de contrato que faz com que as sub-classes 
contemplem as mesmas hierarquias e /ou padrões.
```
<br>

2. Explique o que é necessário para que a compilação da ClasseConcreta ocorra sem erros:
<br>

```typescript
abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
}

class ClasseConcreta extends ClasseAbstrata {

}
```
<br>
```
É necessário implementar o método imprimaAlgo() na ClasseConcreta. Pois, como a classe herda da classe abstrata, ela herda 
também os métodos abstratos, e por isso, ela deve implementar os métodos definidos na classe abstrata.
```
<br>

```typescript	
abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
}

class ClasseConcreta extends ClasseAbstrata {
    imprimaAlgo(): void {
        console.log("Imprimindo algo...");
    }
}
```
<br>

3. Se uma classe que herda de uma abstrata e não implementa os seus métodos, o que ocorre?
<br>
```
Ocorre um erro de compilação, pois a classe que herda deve implementar os métodos definidos na classe abstrata.
```
<br>

5. Não podemos aplicar o operador new em FiguraGeometrica, mas porque então podemos realizar o seguinte código de instanciação:
<br>

```typescript
abstract class FiguraGeometrica {
    // ...
}

let figuras: FiguraGeometrica[] = new Array();
```

<br>
```
Podemos realizar o código acima pois estamos criando um array de FiguraGeometrica, e não uma instância de FiguraGeometrica.
```