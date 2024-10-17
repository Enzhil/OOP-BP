<?php

# Class dan Program
class Animal
{
    public $animals = [];

    public function __construct($data = [])
    {
        $this->animals = $data;  
    }

    public function index()
    {
        foreach ($this->animals as $animal) {
            echo $animal;
            echo "<br>";
        }
    }

    public function store($data)
    {
        array_push($this->animals, $data);
        echo $data;
        echo "<br>";
    }

    public function update($index, $data)
    {
        if (isset($this->animals[$index])) {
            $this->animals[$index] = $data;
        } 
    }

    public function destroy($index)
    {
        if (isset($this->animals[$index])) {
            array_splice($this->animals, $index, 1);
        }
    }
}

# Bagian Print
$animal = new Animal(['Paus Orca', 'Rubah']);

echo "Index - Menampilkan Seluruh Hewan <br>";
$animal->index();
echo "<br>";

echo "Store - Menambahkan Hewan Baru <br>";
$animal->index();
$animal->store('Serigala');
echo "<br>";

echo "Update - Mengupdate Hewan <br>";
$animal->update(2, 'Kucing Anggora');
$animal->index();
echo "<br>";

echo "Destroy - Menghapus Hewan <br>";
$animal->destroy(1);
$animal->index();
echo "<br>";

?>
