input <- readLines("input.txt")

# create the map
m <- matrix(0, 1000, 1000)

# apply each line separately
for(line in input){
  # read out the ranges
  rangeMatches <- gregexpr("\\d+", line)
  ranges <- regmatches(line, rangeMatches)
  ranges <- lapply(ranges, function(x) as.integer(x))[[1]]
  
  # pick type
  op <- gregexpr("\\d", line)[[1]][1]
  
  # switch and apply the operation
  if (op == 9) {
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-1
  } else if (op == 10){
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-0
  } else {
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-(1-m[ranges[1]:ranges[3], ranges[2]:ranges[4]])
  }
}

# do summation
totalLights <- sum(apply(m,1,sum))

print(totalLights)

m <- matrix(0, 1000, 1000)

for(line in input){
  rangeMatches <- gregexpr("\\d+", line)
  ranges <- regmatches(line, rangeMatches)
  ranges <- lapply(ranges, function(x) as.integer(x))[[1]]
  op <- gregexpr("\\d", line)[[1]][1]
  if (op == 9) {
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-(m[ranges[1]:ranges[3],ranges[2]:ranges[4]]+1)
  } else if (op == 10){
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-pmax(m[ranges[1]:ranges[3],ranges[2]:ranges[4]]-1,0)
  } else {
    m[ranges[1]:ranges[3],ranges[2]:ranges[4]]<-(m[ranges[1]:ranges[3], ranges[2]:ranges[4]]+2)
  }
}

totalLights <- sum(apply(m,1,sum))

print(totalLights)