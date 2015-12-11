input <- "yzbqklnj"


# n <- 0
# target <- "00000"
# while (T) {
#   hash <- digest(paste(input,n,sep = ""),serialize = F)
#   if (substr(hash,0,5) == target) {
#     break
#   } else {
#     n <- n + 1
#   }
# }


# n <- 0
target1 <- "00000"
target1Found <- F
n1 <- -1

target2 <- "000000"
n2 <- -1
target2Found <- F

while (!(target1Found && target2Found)) {
  hash <- digest(paste(input,n,sep = ""),serialize = F)
  if (!target1Found && substr(hash,0,5) == target1) {
    target1Found <- T
    n1 <- n
  }
  if (!target2Found && substr(hash,0,6) == target2) {
    target2Found <- T
    n2 <- n
  }
  n <- n + 1
}

print(n1)
print(n2)