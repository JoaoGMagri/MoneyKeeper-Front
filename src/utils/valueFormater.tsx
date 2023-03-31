export function valueFormater(value:string) {
  value = value.replace(".",",").replace("-","");
  const valueArray = value.split("");
  let numberPointer: boolean = false;
  let indicePoiter: number = 0;

  valueArray.forEach( (e:string, i:number) => {
    if (e === ",") {
      numberPointer = true;
      indicePoiter = i
    };
  });
  if (!numberPointer) {
    value += ",00"
  };
  if (value.length - indicePoiter === 2) {
    value += "0"
  };

  return value;
}