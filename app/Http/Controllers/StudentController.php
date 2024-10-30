<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(){
        $student = Student::all(); 
        $data = [
            'message' => 'Berhasil akses data',
            'data' => $student
        ];
        return response()->json($data, 200);
    }

    public function store(Request $request){
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,

        ];
        $student = Student::create($input);
        $data = [
            'message' => 'Data berhasil ditambah',
            'data' => $student
        ];

        return response()->json($data, 200);
    }
    public function update(Request $request, $id) {
        $student = Student::find($id);
    
        $student->nama = $request->nama;
        $student->nim = $request->nim;
        $student->email = $request->email;
        $student->jurusan = $request->jurusan;
        $student->save();
        
        $data = [
            'message' => 'Data berhasil dirubah',
            'data' => $student
        ];
    
        return response()->json($data, 200);
    }
    
    public function destroy($id) {
        $student = Student::find($id);
        $student->delete();
        
        $data = [
            'message' => 'Data berhasil dihapus'
        ];
    
        return response()->json($data, 200);
    }
    
}

