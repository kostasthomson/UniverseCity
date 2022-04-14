<?php
    class DataBase  {
        private $DB;
        private $TABLES_COUNT = 0;
        private $TABLES = array();
        private $COLUMNS;
        private $COLUMNS_NAMES;
        private $COLUMNS_TYPES;
        private $QueryResults = null;

        function __construct($string, $table_name="", $columns=array()) {
            $this->DB = new PDO($string);
            if($table_name!="" && count($columns)!=0){
                $this->createTable($table_name, $columns);
            }
        }

        private function createColumnsString(): string {
            $columns_array = array();  
            for($i=0; $i<count($this->COLUMNS); $i++){
                $name = $this->COLUMNS_NAMES[$i];
                $type = $this->COLUMNS_TYPES[$i];
                $columns_array[$i] = "$name $type";
            }
            return implode(", ", $columns_array);
        }

        function createTable($table_name, $columns): bool {
            try{
                $this->COLUMNS = $columns;
                $this->COLUMNS_NAMES = array_keys($this->COLUMNS);
                $this->COLUMNS_TYPES = array_values($this->COLUMNS);
                $this->TABLES[$table_name] = array($this->COLUMNS);
                $this->TABLES_COUNT++;
                
                $table_columns_string = $this->createColumnsString();
                $statement = $this->DB->prepare("CREATE TABLE IF NOT EXISTS $table_name ($table_columns_string);");
                $statement->execute();
                
                return true;
            }catch (Exception $e) {
                return false;
            }
        }

        function makeDMLQuery($query): bool {
            try{
                $this->DB->exec($query);
                return true;
            }catch (Exception $e) {
                return false;
            }
        }

        function makeQuery($query): bool {
            try{
                $statement = $this->DB->prepare($query);
                $statement->execute();
                $this->QueryResults = $statement->fetchAll(PDO::FETCH_ASSOC);               
                return true;
            }catch (Exception $e) { 
                return false;
            }
        }

        function getColumns(): array {
            return array_keys($this->COLUMNS);
        }

        function getQueryResults(): array {
            return $this->QueryResults;
        }

        function close(): void {
            $this->DB = null;
        }
    }
?>