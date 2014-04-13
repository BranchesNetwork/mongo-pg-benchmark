mongo-pg-benchmark
==================
Comparing MongoDB and PostgresSQL performance

## Information

This is in fact a comparison of the ODMs `Sequelize` and `Mongoose`,
but they provide a thin object-oriented wrapper, simplifying the experiment.

## Summary

MongoDB wins at fast data insertion, beating
Postgres by a factor of two, approximately.
The write concern is the default of Mongoose.

Postgres is generally faster by factors of two up to eight at retrieving records.

Postgres beats MongoDB at unindexed querying on unindexed searche.
See 'select year < 1990':  `24522.07 ms` vs. `426.3041 ms` - 57 times faster (!)
and 'select country = Germany': `319 ms` vs. `13 ms` - 25 times faster

## Conclusion

MongoDB is excellent for inserting massive amounts of data in a short time.

Querying is very expensive in MongoDB. If you have a relational schema, you
should probably not use MongoDB. PostgreSQL (or MySQL) was built for that.

## Results

2.6 GHz i7, SSD, 1600 MHz RAM - 6000 records, 10 repetitions per test

```
mongo insert 110600.124383 ms
mongo select * 6000 results 10228.704654 ms
mongo select * 6000 results 10387.470111 ms
mongo select * 6000 results 10571.904192 ms
mongo select * 6000 results 10770.523981 ms
mongo select * 6000 results 10924.32811 ms
mongo select * 6000 results 20112.593777 ms
mongo select * 6000 results 20302.456227 ms
mongo select * 6000 results 20462.099967 ms
mongo select * 6000 results 20676.047836 ms
mongo select * 6000 results 20832.672556 ms
mongo select * - average 6000 results 15526.880141100002 ms
mongo 'select year < 1990' 2691 results, 20499.428586 ms
mongo 'select year < 1990' 2691 results, 20575.62174 ms
mongo 'select year < 1990' 2691 results, 20709.330657 ms
mongo 'select year < 1990' 2691 results, 20807.850058 ms
mongo 'select year < 1990' 2691 results, 20881.157154 ms
mongo 'select year < 1990' 2691 results, 20955.201467 ms
mongo 'select year < 1990' 2691 results, 30029.146597 ms
mongo 'select year < 1990' 2691 results, 30160.426968 ms
mongo 'select year < 1990' 2691 results, 30264.517867 ms
mongo 'select year < 1990' 2691 results, 30338.061327 ms
mongo 'select year < 1990' - average 2691 results, 24522.074242099996 ms
mongo 'select country = Germany' 28 results, 307.542973 ms
mongo 'select country = Germany' 28 results, 309.108031 ms
mongo 'select country = Germany' 28 results, 310.997636 ms
mongo 'select country = Germany' 28 results, 314.473025 ms
mongo 'select country = Germany' 28 results, 316.161167 ms
mongo 'select country = Germany' 28 results, 318.805885 ms
mongo 'select country = Germany' 28 results, 326.834587 ms
mongo 'select country = Germany' 28 results, 328.549462 ms
mongo 'select country = Germany' 28 results, 330.558811 ms
mongo 'select country = Germany' 28 results, 332.540823 ms
mongo 'select country = Germany' - average 28 results, 319.55724 ms
pg insert 220913.492809 ms
pg select * 6000 results 196.13888 ms
pg select * 6000 results 365.618251 ms
pg select * 6000 results 535.695522 ms
pg select * 6000 results 703.190442 ms
pg select * 6000 results 865.607623 ms
pg select * 6000 results 10028.520168 ms
pg select * 6000 results 10221.586682 ms
pg select * 6000 results 10392.897515 ms
pg select * 6000 results 10560.681894 ms
pg select * 6000 results 10724.345761 ms
pg select * - average 6000 results 5459.428273799999 ms
pg 'select year < 1990' 2691 results, 68.56179 ms
pg 'select year < 1990' 2691 results, 156.332982 ms
pg 'select year < 1990' 2691 results, 224.469333 ms
pg 'select year < 1990' 2691 results, 314.285658 ms
pg 'select year < 1990' 2691 results, 383.760723 ms
pg 'select year < 1990' 2691 results, 470.28014 ms
pg 'select year < 1990' 2691 results, 536.615844 ms
pg 'select year < 1990' 2691 results, 625.53032 ms
pg 'select year < 1990' 2691 results, 700.413224 ms
pg 'select year < 1990' 2691 results, 782.791488 ms
pg 'select year < 1990' - average 2691 results, 426.3041502 ms
pg 'select country = Germany' 28 results, 5.151132 ms
pg 'select country = Germany' 28 results, 7.341867 ms
pg 'select country = Germany' 28 results, 10.137447 ms
pg 'select country = Germany' 28 results, 11.193245 ms
pg 'select country = Germany' 28 results, 12.526706 ms
pg 'select country = Germany' 28 results, 13.823294 ms
pg 'select country = Germany' 28 results, 15.151269 ms
pg 'select country = Germany' 28 results, 16.655433 ms
pg 'select country = Germany' 28 results, 18.119123 ms
pg 'select country = Germany' 28 results, 19.427531 ms
pg 'select country = Germany' - average 28 results, 12.952704700000002 ms
```
