

export class AuthRegistro {
    celular?:       string;
    nombre?:        string;
    apellido?:      string;
    password?:      string;
}
export class AuthLogin {
    celular?:       string;
    password?:      string;
}

export interface Usuario {
    celular?:      string;
    nombre?:       string;
    apellido?:     string;
    rol?:          string;
    ciudad?:       string;
    departamento?: string;
    usuarioID?:    string;
    createdAt?:      Date;
    updatedAt?:      Date;
}

export interface RespCreacionUsuario {
    msg:            string;
    token:          string;
    usuario:        Usuario;
    menu:           Menu[];
}

export interface RespAcualizacionUsuario {
    msg:            string;
    usuario:        Usuario;
}

export interface RespLoginUsuario {
    ok:             boolean;
    msg:            string
    usuario:        Usuario;
    token:          string;
    menu:           Menu[];
    createdAt:      Date;
    updatedAt:      Date;
}

export interface RespUsuario {
    ok:             boolean;
    usuario:        Usuario;
}

export interface RespUsuarioGET {
    total:              boolean;
    Usuario:            Usuario[];
}

export interface Menu {
    titulo:  string;
    icono:   string;
    submenu: Submenu[];
}

export interface Submenu {
    titulo: string;
    url:    string;
}

export interface RespuestaRoles {
    total:          number;
    Roles:          Role[];
}

export interface Role {
    descripcion:    string;
    createdAt:      Date;
    updatedAt:      Date;
    rolID:          string;
}

export interface RespuestaRolPost {
    msg: string;
    rol: Role;
}

export interface RespuestaRolPut {
    msg: string;
    rolDB: Role;
}

export interface RespuestaRolDelete {
    msg: string;
    Rol: Role;
}

/******************************* DEPARTAMENTO ******************************/
/***************************************************************************/

export interface RespuestaDepartamento {
    total:        number;
    Departamento: Departamento[];
}

export interface RespuestaDepartamentoDelete {
    msg:        string;
    Departamento: Departamento;
}

export interface RespuestaDepartamentoPost {
    msg:        string;
    departamento: Departamento;
}

export interface RespuestaDepartamentoPut {
    msg:        string;
    departamentoDB: Departamento;
}


export interface Departamento {
    descripcion:    string;
    createdAt:      Date;
    updatedAt:      Date;
    departamentoID: string;
}


/********************************* CIUDAD *********************************/
/***************************************************************************/

export interface RespCiudad {
    total:  number;
    Ciudad: Ciudad[];
}
export interface Ciudad {
    descripcion:  string;
    departamento: Departamento;
    ciudadID:     string;
}

export interface RespCiudadPut {
    msg:  string;
    ciudadDB: Ciudad;
}

export interface RespCiudadPost {
    msg:  string;
    ciudad: Ciudad;
}

export interface RespCiudadDelete {
    msg:  string;
    Ciudad: Ciudad;
}

/****************************** TIPO EMERGENCIA ****************************/
/***************************************************************************/

export interface RespTipoEmergencia {
    ok:               boolean;
    total:             number;
    tipoEmergenciaDB: TipoEmergencia[];
}

export interface TipoEmergencia {
    descripcion:      string;
    createdAt:        Date;
    updatedAt:        Date;
    tipoEmergenciaID: string;
}

export interface RespTipoEmergenciaDelete {
    ok:               boolean;
    msg:             string;
    tipoEmergencia: TipoEmergencia;
}

export interface RespTipoEmergenciaGet {
    ok:               boolean;
    tipoEmergenciaDB: TipoEmergencia;
}

export interface RespTipoEmergenciaPut {
    ok:               boolean;
    msg:             string;
    tipoEmergenciaDB: TipoEmergencia;
}

export interface RespTipoEmergenciaPost {
    ok:               boolean;
    msg:             string;
    tipoEmergencia: TipoEmergencia;
}



/*********************************** NIVEL *********************************/
/***************************************************************************/

export interface RespNivel {
    ok:    boolean;
    total: number;
    nivel: Nivel[];
}

export interface Nivel {
    descripcion: string;
    prioridad:   number;
    nivelID:     string;
}

export interface RespuestaNivelPost {
    msg:        string;
    nivel:      Nivel;
}

export interface RespuestaNivelDelete {
    msg:        string;
    nivel:      Nivel;
}

export interface RespuestaNivelPut {
    msg:        string;
    nivel:      Nivel;
}


/********************************* EMERGENCIA ******************************/
/***************************************************************************/

export interface RespEmergencia {
    total:      number;
    Emergencia: Emergencia[];
}

export interface Emergencia {
        relatoria:       string;
        direccion:       string;
        longitud?:        string;
        latitud?:         string;
        img?:             string;
        emitido?:           boolean;
        estados?:         Estados;
        nivel?:           Nivel;
        denunciante?:     Usuario;
        tipo_emergencia?: TipoEmergencia;
        emergenciaID?:    string;
}

export interface RespEmergenciaPut {
    msg:        string;
    emergencia: Emergencia;
}

/********************************* ESTADOS *********************************/
/***************************************************************************/


export interface RespuestaEstados {
    total:          number;
    estados:          Estados[];
}

export interface Estados {
    descripcion:   string;
    estadosID:     string;
}

export interface RespuestaEstadoPost {
    msg:    string;
    estados: Estados;
}

export interface RespuestaEstadoPut {
    msg:    string;
    estado: Estados;
}

export interface RespuestaEstadoDelete {
    msg:    string;
    estado: Estados;
}


/********************************* ALERTAS *********************************/
/***************************************************************************/

export interface RespuestaAlertaPost {
    msg:    string;
    alerta: Alerta;
}

export interface RespuestaAlertaPut {
    msg:    string;
    alerta: Alerta;
}

export interface Alerta {
    estado:     boolean;
    operador:   string;
    emergencia: string;
    alertaID:   string;
}
