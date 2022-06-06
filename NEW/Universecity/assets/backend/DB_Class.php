<?php
    class DataBase  {
        private $DB;
        private string $TABLE_NAME;
        private array $TABLE_INFO;
        private array $QueryResults;
        private array $COLUMNS;

        function __construct(string $string) {
            $this->DB = new PDO($string);
        }
        
        private function createColumnsString(): string {
            $columns_array = array();  
            for($i=0; $i<count( $this->COLUMNS); $i++){
                $name = array_keys( $this->COLUMNS)[$i];
                $type = array_values( $this->COLUMNS)[$i];
                $columns_array[$i] = "$name $type";
            }
            return implode(", ", $columns_array);
        }

        function createTable(string $table_name, array $columns): bool {
            try{
                $this->COLUMNS = $columns;
                
                
                $table_columns_string = $this->createColumnsString();
                $statement = $this->DB->prepare("CREATE TABLE IF NOT EXISTS $table_name ($table_columns_string);");
                $statement->execute();
                
                return true;
            }catch (Exception $e) {
                return false;
            }
        }

        function makeDMLQuery(string $query): bool {
            // try{
            //     $this->DB->exec($query);
            //     return true;
            // }catch (Exception $e) {
            //     echo $e->getMessage();
            //     return false;
            // }
            return $this->makeQuery($query);
            //! delete this function and replace it with makeQuery to all files
        }

        function makeQuery(string $query): bool {
            try{
                // $query = strtoupper($query);
                $table_index = strpos($query, 'FROM');
                if($table_index !== false) {
                    $table_index += 5;
                    $sub_query = substr($query, $table_index);
                    $space_index = strpos($sub_query, ' ');
                    if($space_index !== false) {
                        $this->setWorkingTable(substr($sub_query, 0, $space_index));
                    }else {
                        $this->setWorkingTable($sub_query);
                    }
                }
                $statement = $this->DB->prepare($query);
                $statement->execute();
                $this->QueryResults = $statement->fetchAll(PDO::FETCH_ASSOC);               
                return true;
            }catch (Exception $e) { 
                echo $e->getMessage();
                return false;
            }
        }
        
        function setWorkingTable(string $table_name) {
            $this->TABLE_NAME = $table_name;
            $this->setTableInfo();
        }

        private function setTableInfo() {
            $statement = $this->DB->query("pragma table_info('$this->TABLE_NAME')");
            $this->TABLE_INFO = $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        function getTableInfo(): array {
            return $this->TABLE_INFO;
        }

        function getQueryResults(): array {
            return $this->QueryResults;
        }

        function close(): void {
            $this->DB = null;
        }
        
        function getColumns(): array {
            return $this->COLUMNS;
        }
    }
?>