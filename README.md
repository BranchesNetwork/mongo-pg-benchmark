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

Querying speed has not yet been tested, just bulk insertion and retrieval.

## Example output

2.6 GHz i7, SSD, 1600 MHz RAM

```
Insert Speed: mongo done, took 293.583605 ms
mongo Retrieval Speed 100 records: took 45.443006 ms
mongo Retrieval Speed 100 records: took 49.592159 ms
mongo Retrieval Speed 100 records: took 54.407546 ms
mongo Retrieval Speed 100 records: took 58.712867 ms
mongo Retrieval Speed 100 records: took 62.772652 ms
mongo Retrieval Speed 100 records: took 66.999733 ms
mongo Retrieval Speed 100 records: took 71.208196 ms
mongo Retrieval Speed 100 records: took 75.13282 ms
mongo Retrieval Speed 100 records: took 78.863108 ms
mongo Retrieval Speed 100 records: took 83.861088 ms
mongo Retrieval Speed 100 records: took 89.806252 ms
mongo Retrieval Speed 100 records: took 93.977211 ms
mongo Retrieval Speed 100 records: took 109.348588 ms
mongo Retrieval Speed 100 records: took 112.252486 ms
mongo Retrieval Speed - average 100 records: 75.16983657142858 ms

Insert Speed: pg done, took 557.787418 ms
Retrieval Speed 100 records: pg done, took 9.915686 ms
Retrieval Speed 100 records: pg done, took 14.415878 ms
Retrieval Speed 100 records: pg done, took 19.234453 ms
Retrieval Speed 100 records: pg done, took 23.576441 ms
Retrieval Speed 100 records: pg done, took 28.545071 ms
Retrieval Speed 100 records: pg done, took 32.073767 ms
Retrieval Speed 100 records: pg done, took 38.935411 ms
Retrieval Speed 100 records: pg done, took 42.080887 ms
Retrieval Speed 100 records: pg done, took 45.730525 ms
Retrieval Speed 100 records: pg done, took 48.278625 ms
Retrieval Speed 100 records: pg done, took 51.097523 ms
Retrieval Speed 100 records: pg done, took 53.610918 ms
Retrieval Speed 100 records: pg done, took 56.08786 ms
Retrieval Speed 100 records: pg done, took 58.482034 ms
pg Retrieval Speed - average 100 records: 37.29036278571429 ms
```
