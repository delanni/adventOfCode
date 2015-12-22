#read the inputs
input <- readChar("input.txt", file.info("input.txt")$size)

#map them to the actual floor step operation
values <- sapply(strsplit(input,"")[[1]], function(letter){ if (letter == "(") 1 else -1 })

#the result will be the sum of the steps
print(sum(values))

# lets do a loop and stop if we reach -1st
current <- 0
index <- 1
for(v in values){
    current = current + v
    if (current == -1) break;
    index = index+1
}

#and that's the second part
print(index)