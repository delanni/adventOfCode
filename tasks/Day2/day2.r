#Read input as lines
input <- readLines("input.txt")

#Parse rows to vectors of 3 elements
boxes <- lapply(input, function(str) { as.integer(strsplit(str,"x")[[1]]) } )

#Calculate each box's wrapper
boxSizes <- sapply(boxes, function(e){ 
  sides <- c(e[1]*e[2],e[2]*e[3],e[3]*e[1])
  sum(sides*2)+min(sides)
})

#sum 'dem
totalArea <- sum(boxSizes)

print(totalArea)

#Calculate each box's ribbon
ribbonSizes <- sapply(boxes, function(e){
  around <- (sum(e)-max(e))*2
  around + prod(e)
  })
  
#sum 'dem
totalRibbon <- sum(ribbonSizes)

print(totalRibbon)