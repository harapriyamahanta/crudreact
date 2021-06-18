<?php

namespace App\Http\Controllers\Resource;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\School;
use Validator;
class SchoolResource extends Controller
{
    private $status     =   200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schollist = School::orderBy('id','DESC')->get();
        return $schollist;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        //dd($request);
        // validate inputs
        $validator          =       Validator::make($request->all(),
            [
                "name"        =>      "required",
                "address"         =>      "required",
                //"email"             =>      "required|email",
                "phone"             =>      "required|numeric"
            ]
        );

        // if validation fails
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => $validator->errors()->first()]);
        }
        try{
            $school = new School();
            $school->name = $request->name;
            $school->address = $request->address;
            $school->phone = $request->phone;
           
            $school->school_medium = $request->school_medium;
            $school->save();
            return response()->json(["status" => $this->status, "success" => true, "message" => "Record updated successfully"]);
        }catch(Exception $e){
            return response()->json(["status" => "failed", "validation_errors" => $e->getMessage()]);
        }
        
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schol = School::find($id);
        return $schol;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $schol = School::find($id);
        return $schol;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        
        $validator          =       Validator::make($request->all(),
            [
                "name"        =>      "required",
                "address"         =>      "required",
                //"email"             =>      "required|email",
                "phone"             =>      "required|numeric"
            ]
        );

        // if validation fails
        if($validator->fails()) {

            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()->first()]);
        }
        try{
            $school = School::find($id);
            $school->name = $request->name;
            $school->address = $request->address;
            $school->phone = $request->phone;
            $school->school_medium = $request->school_medium;
            $school->save();
        
            return response()->json(["status" => $this->status, "success" => true, "message" => "Record updated successfully"]);
        }catch(Exception $e){
            return response()->json(["status" => "failed", "validation_errors" => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $schol = School::find($id)->delete();
        if($schol == 1) {
            return response()->json(["status" => $this->status, "success" => true, "message" => "Record deleted successfully"]);
        }
        else{
            return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
        }
    }
}
