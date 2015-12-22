input <- readLines("input.txt")

# Test each row with the given criteria
goodOnes <- sapply(input, function(line) {
  f <- gregexpr("(ab)|(cd)|(pq)|(xy)",line)[[1]][1] >= 0
  if (f)
    return(FALSE)
  v <- length(gregexpr("[aeiou]", line)[[1]]) >= 3
  p <- gregexpr("(.)\\1",line)[[1]][1] > -1
  
  return (v && p)
})

# Keep only true values, and count them
goodOnes <- goodOnes[goodOnes]
cGoodOnes <- length(goodOnes)

print(cGoodOnes)


# For part 2, create the testing predicate beforehand
tester <- function(string) {
  letters <- strsplit(string, NULL)[[1]]
  len <- length(letters)
  shift1 <- letters[2:len]
  shift2 <- letters[3:len]
  # Create every duplet and triplet by zipping with shifted versions
  duplets <- cbind(letters,shift1)[1:(len - 1),]
  triplets <- cbind(letters,shift1,shift2)[1:(len - 2),]
  
  # Test duplets criterion
  dupletsTest <- apply(duplets, 1, function(duplet){
    m <- gregexpr(paste(duplet,collapse=""), string)[[1]]
    test <- m[1]<(m[2]-1)
    !is.na(test) && test == T
  })
  
  # Test the triplets criterion
  tripletsTest <- apply(triplets, 1, function(triplet){
    triplet[1]==triplet[3]
  })
  
  # Check if we have a match in both
  any(dupletsTest) && any(tripletsTest)
}

# Apply the transformation
betterOnes <- sapply(input, tester)

# Keep only the True ones, and count
betterOnes <- betterOnes[betterOnes]
cBetterOnes <- length(betterOnes)

print(cBetterOnes)