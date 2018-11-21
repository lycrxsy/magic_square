# magic_square
- A program written in nodejs to search for  the largest magic square inside in CSV file  
- If there is more than one Magic Square and the Sum value is same, then push all the results. 
- Input a CSV file and then run `npm run execute {$name}.csv`  . output is a written CSV file with the same name as the input file, appended ".magic" which has as     content the selected magic square.
- Run the `LargestResult.csv`, `MultyResult.csv`, `NoResult.csv` ,see the results.  

## Example:
### test.csv    
2,7,6,1  
9,5,1,3  
4,3,8,51,2,3,5  


run `> npm run execute test.csv`  
File "test.csv.magic" generated. 3x3 Matrix, Magic sum 15

### test.csv.magic     
2,7,6  
9,5,1  
4,3,8  

15
